var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Web3 = require('web3');
var request = require('request');

app.get('/saveData/:id/:name/:email/:contact/:address/:type', function(req, res)
{
    console.log(Web3);
    var web3;
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/"));
    var id = req.param.id;
    var name = req.param.name;
    var email = req.param.email;
    var contact = req.param.contact;
    var address= req.param.address;
    var type = req.param.type;

    doctorRecordContractAddress="0x9a8161af0fd0fc1d3c14abaab76240fb7fa26735";
    doctorRecordAbi= [{"constant":false,"inputs":[{"name":"_id","type":"uint24"},{"name":"_name","type":"bytes32"},{"name":"_emailId","type":"string"},{"name":"_contactNumber","type":"uint8"},{"name":"_contactAddress","type":"string"}],"name":"setDoctorInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_contractAddress","type":"address"}],"name":"setPatientContractAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"PTContractAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"AllDoctors","outputs":[{"name":"doctorId","type":"uint24"},{"name":"doctorName","type":"bytes32"},{"name":"doctorEmailId","type":"string"},{"name":"dContactNumber","type":"uint8"},{"name":"doctorAddress","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_docId","type":"uint24"},{"name":"_patientId","type":"uint24"}],"name":"checkAuthDoctor","outputs":[{"name":"check","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllDoctorsLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_docId","type":"uint24"}],"name":"getDoctorDetailsById","outputs":[{"name":"","type":"uint24"},{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"uint8"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_dName","type":"bytes32"}],"name":"getDoctorDetailsByName","outputs":[{"name":"","type":"uint24"},{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"uint8"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint24"}],"name":"getDoctorNameById","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_docId","type":"uint24"},{"name":"_patientId","type":"uint24"}],"name":"getPatientDetailsByDoctorId","outputs":[{"name":"id","type":"uint24"},{"name":"name","type":"bytes32"},{"name":"email","type":"string"},{"name":"contactNo","type":"uint8"},{"name":"contactAddress","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
    doctorRecordContract = web3.eth.contract(doctorRecordAbi);
    doctorRecordInstance = doctorRecordContract.at(doctorRecordContractAddress);

    patientRecordContractAddress="0x0efa07c64112b0dc2e9c1fb4616d0db53d4f22e6";
    patientRecordAbi= [{"constant":false,"inputs":[{"name":"_docId","type":"uint24"},{"name":"_patientId","type":"uint24"}],"name":"assignAuthDoctors_toPatient","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_docId","type":"uint24"},{"name":"_patientId","type":"uint24"}],"name":"revokeAuthDoctors_toPatient","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint24"},{"name":"_name","type":"bytes32"},{"name":"_emailId","type":"string"},{"name":"_contactNumber","type":"uint8"},{"name":"_contactAddress","type":"string"}],"name":"setPatientInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"AllPatient","outputs":[{"name":"patientId","type":"uint24"},{"name":"patientName","type":"bytes32"},{"name":"patientEmailId","type":"string"},{"name":"pContactNumber","type":"uint8"},{"name":"patientAddress","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_docId","type":"uint24"},{"name":"_patientId","type":"uint24"}],"name":"checkAuthDoctor","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllPatientLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_docId","type":"uint24"},{"name":"_patientId","type":"uint24"}],"name":"getPatientDetailsByDoctor","outputs":[{"name":"","type":"uint24"},{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"uint8"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_patientId","type":"uint24"}],"name":"getPatientDetailsById","outputs":[{"name":"","type":"uint24"},{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"uint8"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_pName","type":"bytes32"}],"name":"getPatientDetailsByName","outputs":[{"name":"","type":"uint24"},{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"uint8"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint24"}],"name":"getPatientNameById","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
    patientRecordContract = web3.eth.contract(patientRecordAbi);
    patientRecordInstance = patientRecordContract.at(patientRecordContractAddress);

    if(type == "D")
    	saveDoctorRecord(id,name,email,contact,address);
    else
    	savePatientRecord(id,name,emai,contact,address);
});

function saveDoctorRecord(id,name,email,contact,address)
{
	doctorRecordInstance.setDoctorInfo(id,name,email,contact,address,
	{
		from: this.web3.eth.accounts[0],
		gas: 2000000, 
		function(err,res)
		{
			console.log("saved successfully");
		}
	}) 
}

function savePatientRecord(id,name,email,contact,address)
{
	patientRecordInstance.setPatientInfo(id,name,email,contact,address,
	{
		from: this.web3.eth.accounts[0],
		gas: 2000000, 
		function(err,res)
		{
			console.log("saved successfully");
		}
	})   

}


http.listen(444, function(){
  console.log('simple nodejs listening on *:444');
}); 




