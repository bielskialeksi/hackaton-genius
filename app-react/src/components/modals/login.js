import React, {Component} from 'react';
import update from 'react-addons-update'; 

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import { Button, Modal} from 'react-materialize';

const LINK = "http://localhost:1337"

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                user_email: '',
                user_pass: '',
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
            const login = await fetch(`${LINK}/api/auth/local`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    identifier: this.state.form.user_email,
                    password: this.state.form.user_pass
                })
            })

            const loginResponse = await login.json()
            if(!loginResponse.jwt){
                M.toast({html: 'User or password is wrong.'})
                this.setState({open: true})
                return;
            }
            localStorage.setItem('user', JSON.stringify({
                Bearer: loginResponse.jwt,
                User: loginResponse.user
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
                header="Login"
                id="Modal-login"
                open={this.state.open}
                trigger={this.props.button}
                >
                
                <form onSubmit={this.handleSubmit}>

                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">mail</i>
                            <input id="user_email" type="text" className="validate" onChange={this.handleChange} value={this.state.form.user_email || ''}/>
                            <label>Mail Adress</label>
                        </div>
                        
                        <div className="input-field col s12">
                            <i className="material-icons prefix">password</i>
                            <input id="user_pass" type="password" className="validate" onChange={this.handleChange} value={this.state.form.user_pass || ''}/>
                            <label>Password</label>
                        </div>
                    </div>

                    <input className="modal-close waves-effect blue_btn" type="submit" value="Connect" />
                </form>
            </Modal>
        )
    }
}

export default Login;