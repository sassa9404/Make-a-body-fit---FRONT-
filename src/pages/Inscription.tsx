import { FormEvent, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Alert,
} from 'react-bootstrap';
import { isValid } from '../form-valide/validation';
import { errorInfo } from '../form-valide/errorMessage';
import { useToast } from '../context/ToastContext';
import './Inscription.css';
import { ObjectiveType } from '../models/Objective';


let listObjective: ObjectiveType[] = [];
const Inscription = () => {
  const navigate = useNavigate();


  const [listObjectiveDisplayed, setListObjectiveDisplayed] = useState<ObjectiveType[]>([
    ...listObjective,
  ]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [apiErrorMessage, setApiErrorMessage] = useState<string[]>([]);

  const { handleToast } = useToast();

  useEffect(() => {
    axios.get('http://localhost:8080/api/objectives').then((response) => {
      listObjective = response.data;
      setListObjectiveDisplayed(listObjective);
    });
  }, []);

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const objectiveRef = useRef<HTMLSelectElement>(null);
  const name = useRef<HTMLInputElement>(null);



  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    setApiErrorMessage([]);

   

    if (email.current?.value && !isValid('email', email.current.value)) {
      setErrorMessage(errorInfo('email'));
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    if (
      password.current?.value &&
      !isValid('password', password.current.value)
    ) {
      setErrorMessage(errorInfo('password'));
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    if (password.current?.value !== confirmPassword.current?.value) {
      setErrorMessage('Combinaison de mot de passe incorrecte');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    if (age.current?.value && !isValid('age', age.current.value)) {
      setErrorMessage(errorInfo('age'));
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    if (Number(age.current?.value) < 18) {
      setErrorMessage(
        "Il faut avoir au moins 18 ans pour utiliser l'application"
      );
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

   
    

    if (!objectiveRef.current?.value) {
      setErrorMessage('Tous les champs sont obligatoires');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    if (listObjective.length === 0) {
      setErrorMessage('Vous devez choisir un objectif');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

     const selectedObjective = listObjectiveDisplayed.filter(
      (objective) => objective.type === objectiveRef.current?.value
    )[0];

    let userIn = {
      email: `${email.current?.value}`,
      password: `${password.current?.value}`,
      age: `${age.current?.value}`,
      objectiveRef: selectedObjective,
      name: `${name.current?.value}`,
      
    };

    axios
      .post('http://localhost:8080/api/auth/register', userIn)
      .then((response) => {
        let userData = response.data;

        console.log('Inscription - HandleSubmit - Reponse : ', userData);
        if (response.status === 201) {
          handleToast({
            message:
              'Inscription reussie, vous pouvez maintenant vous identifier',
            color: 'success',
            delay: 3000,
          });
          navigate('/connexion');
        }
      })
      .catch((error) => {
        console.log('Inscription - HandleSubmit - Error : ', error);
        setApiErrorMessage(error.response.data.message);
      });
  };

  return (
    <>
      <Container className='container'>
        <Row>
          <Col>
            <h2 className='inscription-title mb-4 '>Inscription</h2>
            <h3 className='account-header mb-4'>Informations générales</h3>

            <Form onSubmit={handleSubmitForm} className='mb-3'>
              <FloatingLabel label='Email' className='mb-3'>
                {' '}
                <Form.Control
                  ref={email}
                  type='email'
                  placeholder='Email'
                  required
                />
                <Form.Text className='text-muted'>
                  Nous ne comuniquerons jamais votre Email. Never ever ! Nous
                  utiliserons vos données par contre. Merci d'avance.
                </Form.Text>
              </FloatingLabel>
              <FloatingLabel label='Mot de passe' className='mb-3'>
                {' '}
                <Form.Control
                  type='password'
                  placeholder=' Mot de passe'
                  ref={password}
                  required
                />
                <Form.Text className='d-block'>
                  Minimum 8 caractères, une majuscule, une minuscule, un chiffre
                  et un caractère spécial
                </Form.Text>
              </FloatingLabel>
              <FloatingLabel
                label='Confirmer votre mot de passe'
                className='mb-3'
              >
                <Form.Control
                  type='password'
                  placeholder='Confirmer votre mot de passe'
                  ref={confirmPassword}
                  required
                />
              </FloatingLabel>
              <Row className='mb-3'>
                <Form.Group as={Col}>
                  <FloatingLabel label='Pseudo' className='mb-3'>
                    {' '}
                    <Form.Control
                      ref={name}
                      type='text'
                      placeholder='Pseudo'
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group as={Col}>
                  <FloatingLabel label='Age' className='mb-3'>
                    <Form.Control
                      ref={age}
                      type='text'
                      placeholder='Age'
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
              </Row>
            
              <Form.Select
                className='mb-4 py-3'
                aria-label='Default select example'
                ref={objectiveRef}
              >
                <option value=''>Selectionner votre objectif </option>
                {listObjectiveDisplayed.map((objective) => (
                  <option key={objective.id} value={objective.type}>
                    {objective.type}
                  </option>
                ))}
              </Form.Select>
              
              <Button className='button-signup mb-3' type='submit'>
                Envoyer
              </Button>
              <div>
                <Form.Text>
                  Déjà un compte ? <Link to='/connexion'>Identifiez-vous</Link>
                </Form.Text>
              </div>
            </Form>
            {/* S'il y a un message d'erreur, on l'affiche dans un Alert */}
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            {apiErrorMessage &&
              apiErrorMessage.map((error, i) => (
                <Alert key={i} variant='danger'>
                  {error}
                </Alert>
              ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Inscription;
