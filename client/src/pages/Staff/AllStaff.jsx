import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import StaffCard from '../../components/Widgets/Staff/StaffCard';
import ConfirmDeleteModal from '../../components/Modals/ConfirmDeleteModal';

export default function AllStaff() {
  const [staff, setStaff] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:3002/staff/allstaff')
      .then((res) => {
        setStaff(res.data);
        setIsLoading(false);
      }).catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const deleteStaff = (staff) => {
    setSelectedStaff(staff);
    setShowModal(true);
  };

  const handleDelete = () => {
    const updatedStaffList = staff.filter(employee => employee._id !== selectedStaff._id);
    setStaff(updatedStaffList);
    setShowModal(false);
  };

  const filteredStaff = staff.filter((employee) =>
    employee.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.lastname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-20">
      <p className="text-4xl font-medium">All Staff</p>
      <div className="flex justify-center my-12">
        <TextField
          type="text"
          variant="standard"
          placeholder="Search Staff Name"
          value={searchQuery}
          className="w-[400px]"
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {isLoading ? (
          <p className="text-4xl font-medium">Loading</p>
        ) : (
          filteredStaff.map((employee) => (
            <div key={employee._id}>
              <StaffCard employee={employee} onDelete={() => deleteStaff(employee)}/>
            </div>
          ))
        )}
      </div>
      {showModal && selectedStaff && (
        <ConfirmDeleteModal name={`${selectedStaff.firstname} ${selectedStaff.lastname}`} link={`http://localhost:3002/staff/${selectedStaff._id}`} onClose={() => setShowModal(false)} onDelete={handleDelete}/>
      )}
    </div>
  );
}
