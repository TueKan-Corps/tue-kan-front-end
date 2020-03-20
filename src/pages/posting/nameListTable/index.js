/*
  .add 15-Mar-20
  .edit 16-Mar029
    -- need to (post) to edit data in db (status of participant).
  .edit 20-Mar-20 [Boat]
    -- test with backend mockup.
    -- add skeleleton loading component.
*/

import React from 'react';
import './style.css';

const CreateList =(props)=> {

  let bgColor = !props.isRedeem ? 'rgb(249,198,203)' : 'rgb(184,242,193)';
  bgColor = props.ticketId === props.ticket ? 'skyblue' : bgColor;
  //console.log(props.ticketId);
  return (
    <tr className='table-body table-row' id={`name-list-row-${props.counter}`} style={{background: bgColor}}>
      <td className='table-detail'>{props.counter}</td>
      <td className='table-detail'>{props.id}</td>
      <td className='table-detail left'>{props.firstName}</td>
      <td className='table-detail left'>{props.lastName}</td>
      <td className='table-detail ticket-for-redeem' >{props.ticket}</td>
    </tr>
  );
}

class NameListTable extends React.Component {

  render () {
    let data = this.props.data;
    //console.log(this.state.numberCounter);
    return (
      <table className='posting-name-list-table' id='name-list-table-table'>
        <thead className='posting-name-list-header'>
          <tr className='table-header table-row'>
            <td className='table-detail'><b>No</b></td>
            <td className='table-detail'><b>ID</b></td>
            <td className='table-detail'><b>Firstname</b></td>
            <td className='table-detail'><b>Lastname</b></td>
            <td className='table-detail'><b>Ticket</b></td>
          </tr>
        </thead>

        <tbody className='posting-name-list-body'>
        {
          data.map((data, iteration) => (
            <CreateList key={iteration} counter={iteration + 1} {...data} ticketId={this.props.ticketId} />
          ))
        }
        </tbody>

      </table>
    );
  }

}

export default NameListTable;
