import React, { Component } from 'react';

import { InputGroup, InputGroupAddon, Input, Button, Row, Col } from 'reactstrap';


class UserEntry extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
    }

    componentDidMount() {
        this.input.focus();
    }

    handleInputChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    keyPressed(target) {
        if(target.charCode === 13) {
            this.props.click(this.state.username);
            console.log("Enter key pressed");
            target.preventDefault();
            this.setState({username: ""});
            this.input.focus();
        }
    }

    render() {
        return (
            <div>
                <h2 className="mb-4">Welcome! Enter your username to begin.</h2>
                <Row>
                    <Col md="5" className="d-block mx-auto">
                        <InputGroup>
                            <Input innerRef={(input) => { this.input = input; }} value={this.state.username} placeholder="Steam Username" onKeyPress={this.keyPressed} onChange={this.handleInputChange} />
                            <InputGroupAddon addonType="append"><Button type="submit" disabled={this.props.loading} onClick={() => this.props.click(this.state.username)}>Go!</Button></InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default UserEntry;