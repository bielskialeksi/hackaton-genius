import React, {Component} from 'react';
import update from 'react-addons-update'; 

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import { Button, Modal} from 'react-materialize';

const LINK = "http://localhost:1337"

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                username_register: '',
                user_email_register: '',
                user_pass_register: '',
                user_pass_confirm: ''
            },
            open: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({form: update(this.state.form, {[event.target.id]: {$set: event.target.value}})})
    }

    async handleSubmit(event) {
        event.preventDefault();
        let success = true;
        //checking if all values are inside the form
        for (const [key, value] of Object.entries(this.state.form)) {
            if(value === ''){
                success = false;
                break;
            }
        }

        if(success){
            const login = await fetch(`${LINK}/api/auth/local/register`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.form.username_register,
                    email: this.state.form.user_email_register,
                    password: this.state.form.user_pass_register
                })
            })

            const registerResponse = await login.json()

            localStorage.setItem('user', JSON.stringify({
                Bearer: registerResponse.jwt,
                User: registerResponse.user
            }));

            M.toast({html: 'Success'})
            this.setState({open: false})

            if (this.props.callback){
                this.props.callback()
            }
            
        }else{
            M.toast({html: 'Not every informations provided fit the format.'})
            this.setState({open: true})
        }
    }

    render(){
        return (
            <Modal
                actions={[
                    <Button flat modal="close" node="button" waves="green">Close</Button>
                ]}
                bottomSheet={false}
                fixedFooter={false}
                header="Register"
                id="Modal-register"
                open={this.state.open}
                trigger={this.props.button}
                >
                
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="username_register" type="text" className="validate" onChange={this.handleChange} />
                            <label>Username</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">mail</i>
                            <input id="user_email_register" type="email" className="validate" onChange={this.handleChange} />
                            <label>Email</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">password</i>
                            <input id="user_pass_register" type="password" onChange={this.handleChange} />
                            <label>Password</label>
                        </div>
                        
                        <div className="input-field col s6">
                            <i className="material-icons prefix">password</i>
                            <input id="user_pass_confirm" type="password" onChange={this.handleChange} />
                            <label>Confirm Password</label>
                        </div>
                    </div>

                    <p>
                        <label>
                            <input type="checkbox" name="checkbox" className="filled-in"/>
                            <span>I agree to the term of use and acknowledging the Privacy Policy</span>
                        </label>
                    </p><br/>

                    <input className="modal-close waves-effect blue_btn" type="submit" value="Register" />
                </form>
            </Modal>
        )
    }
}

export default Register;