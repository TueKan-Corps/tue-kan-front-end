/*
  .add 15-Mar-20
  .edit 16-Mar029
    -- need to (post) to edit data in db (status of participant).
*/

import React from 'react';
import './style.css';

const CreateList =(props)=> {

  //const [isRedeem, setRedeem] = React.useState(0);
  let [firstName, lastName] = props.name.split(' ');
  let bgColor = props.redeemThisTicket === props.ticket ? 'lightgreen' : 'pink';
  //let bgColor = 'skyblue';
  console.log(props.redeemThisTicket);
  return (
    <>
      {/*<tr className='table-body table-row' onClick={()=>setRedeem(prev => !prev)}>*/}
      <tr className='table-body table-row' style={{background: bgColor}}>
        <td className='table-detail'>{props.counter}</td>
        <td className='table-detail'>{props.id}</td>
        <td className='table-detail left'>{firstName}</td>
        <td className='table-detail left'>{lastName}</td>
        <td className='table-detail ticket-for-redeem' id={`${props.topic}-ticket-${props.counter-1}`}>{props.ticket}</td>
      </tr>
    </>
  );
}

class NameListTable extends React.Component {

  render () {
    let data = this.props.data;
    //console.log(this.state.numberCounter);
    return (
      <table className='posting-name-list-table'>
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
            <CreateList key={data.name} counter={iteration + 1} {...data} redeemThisTicket={this.props.redeemThisTicket} topic={this.props.topic} />
          ))
        }
        </tbody>

      </table>
    );
  }

}

export default NameListTable;
