import React from "react";
import './style.css';
import AuthService from "../api/services/auth";
import { RouteComponentProps } from "react-router-dom";

const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

interface SignInProps extends RouteComponentProps {
    name?: any;
    value?: any        
}

interface SignInState { 
    message : string,
    loading : boolean,   
    email : string,
    password : string,
    errors : {       
       email : string,
       password : string
    }
}

export class SignIn extends React.Component<SignInProps, SignInState> {

    handleChange = (event : any) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'email':
            errors.email = Regex.test(value)? '': 'Email is not valid';
            break;
            default:
            break;
        }
        this.setState(Object.assign(this.state, { errors,[name]: value }));
        console.log(this.state.errors);        
    }

    handleSubmit = (event : any) => {
        event.preventDefault();
        let validity = true;
        Object.values(this.state.errors).forEach(
          (val) => val.length > 0 && (validity = false)
        );
        if(validity == true){
           console.log("Login can be done");
           AuthService.login(this.state.email, this.state.password).then(
            () => {                             
                // return <Redirect to="/profile" />   
                this.props.history.push("/profile")             
            },
            (error : any) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              this.setState({
                loading: false,
                message: resMessage
              });
            }
          );          
        }else{
           console.log("You cannot be logged in");
        }
    }

    constructor(props: SignInProps) {
        super(props);
        const initialState = {
            message: '',
            loading: false,
            username : '',
            email :    '',
            password : '',
            errors : {
                username : '',
                email:     '',
                password:  ''
            },
            history: '/'
        }
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const {errors} = this.state
        return (
            <div className='wrapper'>
                <div className='form-wrapper'>
                    <h2>Welcome back</h2>
                    <form onSubmit={this.handleSubmit} noValidate >
                        <div className='email'>
                            <label htmlFor="email">Email</label>
                            <input type='email' name='email' onChange={this.handleChange}/>
                            {errors.email.length > 0 &&  <span style={{color: "red"}}>{errors.email}</span>}    
                        </div>
                        <div className='password'>
                            <label htmlFor="password">Password</label>
                            <input type='password' name='password' onChange={this.handleChange}/>
                            {errors.password.length > 0 &&  <span style={{color: "red"}}>{errors.password}</span>}
                        </div>              
                        <div className='submit'>
                            <button>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}