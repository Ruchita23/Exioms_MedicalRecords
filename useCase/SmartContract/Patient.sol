pragma solidity ^0.4.19;

contract Patient
{

    
    struct PatientData
    {
        uint24 patientId;
        bytes32 patientName;
        string patientEmailId;
        uint8 pContactNumber;
        string patientAddress;
    }

    PatientData[] public AllPatient;
    address public owner;
    mapping(uint24=>mapping(uint24=>bool)) SharedInformation;
    
    modifier onlyOwner
    {
        require(msg.sender==owner);
        _;
    }
    
    function Patient()
    {
        owner=msg.sender;
    }

    function setPatientInfo(uint24 _id,bytes32 _name,string _emailId,uint8 _contactNumber,string _contactAddress) public onlyOwner
    {
       AllPatient.push(PatientData(_id,_name,_emailId,_contactNumber,_contactAddress));
    }
    
    function assignAuthDoctors_toPatient(uint24 _docId,uint24 _patientId) onlyOwner
    {
        require(SharedInformation[_patientId][_docId] == false);
        SharedInformation[_patientId][_docId] == true; 
    }
    
    function revokeAuthDoctors_toPatient(uint24 _docId,uint24 _patientId) onlyOwner
    {
        require(SharedInformation[_patientId][_docId] == true);
        SharedInformation[_patientId][_docId] == false; 
    }
    
    function getAllPatientLength()constant returns (uint)
    {
        return AllPatient.length;
    }
    
    function getPatientDetailsById(uint24 _patientId)constant returns(uint24,bytes32,string,uint8,string)
    {
        return (AllPatient[_patientId].patientId,AllPatient[_patientId].patientName,AllPatient[_patientId].patientEmailId,AllPatient[_patientId].pContactNumber,AllPatient[_patientId].patientAddress);
    }
    
    function getPatientNameById(uint24 _id)constant returns(bytes32)
    {
        return AllPatient[_id].patientName;
    }
    
    function getPatientDetailsByName(bytes32 _pName)constant returns(uint24,bytes32,string,uint8,string)
    {
        for(uint24 i =0; i<getAllPatientLength(); i++)
        {
            if(AllPatient[i].patientName == _pName)
            {
                return (AllPatient[i].patientId,AllPatient[i].patientName,AllPatient[i].patientEmailId,AllPatient[i].pContactNumber,AllPatient[i].patientAddress);
                break;
            }
        }
    }
    
    function getPatientDetailsByDoctor(uint24 _docId,uint24 _patientId)constant returns(uint24,bytes32,string,uint8,string)
    {
        require(SharedInformation[_patientId][_docId] == true);
        return (AllPatient[_patientId].patientId,AllPatient[_patientId].patientName,AllPatient[_patientId].patientEmailId,AllPatient[_patientId].pContactNumber,AllPatient[_patientId].patientAddress);
    }
    
    function checkAuthDoctor(uint24 _docId,uint24 _patientId)constant returns(bool)
    {
        return SharedInformation[_patientId][_docId];
    }
    
    
}