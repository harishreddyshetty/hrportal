import React from 'react';

const IndividualEmployee = (props) => {
  const { data } = props
  const { firstName, lastName, id,department, role,email, dob, address, qualifications, joiningDate,mobileNo,bloodGroup, designation ,gender} = data;




  return (
    
    <tr>
      <td>{id}</td>
      <td>{firstName} {lastName}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>{designation}</td>
      <td>{department}</td>
      <td>{qualifications}</td>
      <td>{joiningDate}</td>
      <td>{dob}</td>
      <td>{gender}</td>
      <td>{bloodGroup}</td>
     <td>{mobileNo}</td>
      <td>{address}</td>

    </tr>
  
  );
};

export default IndividualEmployee;
