import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent } from '../store';

class CreateStudent extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  async onSave(ev) {
    ev.preventDefault();
    try {
      const { firstName, lastName, email } = this.state;
      await this.props.create(firstName, lastName, email);
    } catch (error) {
      // this.setState({ error: error.response.data.error });
    }
  }

  render() {
    const { firstName, lastName, email } = this.state;
    const { onChange, onSave } = this;
    return (
      <div>
        <h5>Add Another Student:</h5>
        <form onSubmit={onSave}>
          {/* <pre>{!!error && JSON.stringify(error, null)}</pre> */}
          <label>First Name:</label>
          <input name="firstName" value={firstName} onChange={onChange} />
          <br />
          <label>Last Name:</label>
          <input name="lastName" value={lastName} onChange={onChange} />
          <br />
          <label>Email Address:</label>
          <input name="email" value={email} onChange={onChange} />
          <br />
          <button>Save</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    create: (firstName, lastName, email) =>
      dispatch(createStudent(firstName, lastName, email, history)),
  };
};

export default connect(null, mapDispatchToProps)(CreateStudent);