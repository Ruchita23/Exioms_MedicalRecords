pragma solidity ^0.4.19;

import "./Patient.sol";
contract Doctors
{
    struct DoctorsData
    {
        uint24 doctorId;
        bytes32 doctorName;
        string doctorEmailId;
        uint8 dContactNumber;
        string doctorAddress;
    }
    
    DoctorsData[] public AllDoctors;
    address public owner;
    Patient PT;
    address PTContractAddress;
    
    modifier onlyOwner
    {
        require(msg.sender==owner || msg.sender == address(this));
        _;
    }
    
    function Doctors(address PTContractAddress)
    {
        owner=msg.sender;
        setPatientContractAddress(PTContractAddress);
    }
    
    function setPatientContractAddress(address _contractAddress) public onlyOwner
    {
        PTContractAddress=_contractAddress;
        PT=Patient(PTContractAddress);
    }
    
    function setDoctorInfo(uint24 _id,bytes32 _name,string _emailId,uint8 _contactNumber,string _contactAddress) public onlyOwner
    {
        AllDoctors.push(DoctorsData(_id,_name,_emailId,_contactNumber,_contactAddress));
    }
    
    function getAllDoctorsLength()constant returns(uint)
    {
        return AllDoctors.length;
    }
    
    function getDoctorDetailsById(uint24 _docId)constant returns(uint24,bytes32,string,uint8,string)
    {
        return (AllDoctors[_docId].doctorId,AllDoctors[_docId].doctorName,AllDoctors[_docId].doctorEmailId,AllDoctors[_docId].dContactNumber,AllDoctors[_docId].doctorAddress);
    }
    
    function getDoctorNameById(uint24 _id)constant returns(bytes32)
    {
        return AllDoctors[_id].doctorName;
    }
    
    function getDoctorDetailsByName(bytes32 _dName)constant returns(uint24,bytes32,string,uint8,string)
    {
        for(uint24 i =0; i<getAllDoctorsLength(); i++)
        {
            if(AllDoctors[i].doctorName == _dName)
            {
                return (AllDoctors[i].doctorId,AllDoctors[i].doctorName,AllDoctors[i].doctorEmailId,AllDoctors[i].dContactNumber,AllDoctors[i].doctorAddress);
                break;
            }
        }
    }
    
    function getPatientDetailsByDoctorId(uint24 _docId,uint24 _patientId)constant returns(uint24 id,bytes32 name,string email,uint8 contactNo,string contactAddress)
    {
        (id,name,email,contactNo,contactAddress)=PT.getPatientDetailsByDoctor(_docId,_patientId);
        
    }
    
    function checkAuthDoctor(uint24 _docId,uint24 _patientId)constant returns(bool check)
    {
        check = PT.checkAuthDoctor(_docId,_patientId);
    }
    
    
}