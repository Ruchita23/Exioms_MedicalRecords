
import { Component } from '@angular/core';
import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent 
{
  title = 'Medical Records';
  public PTcontract;
  public DocContract;
  public PTcontractAbi:Array<Object>;
  public DocContractAbi:Array<Object>;
  public owner;
  public web3;
  public networkId;

  constructor()
  {
    
  }

ngOnInit()
{
  this.owner.address = this.web3.eth.accounts[0];  
  this.web3 = new Web3(window['web3'].currentProvider);
  this.web3.eth.defaultAccount=this.web3.eth.coinbase;

  this.DocContract="0x9a8161af0fd0fc1d3c14abaab76240fb7fa26735";
  this.DocContractAbi= [{"constant":false,"inputs":[{"name":"_id","type":"uint24"},{"name":"_name","type":"bytes32"},{"name":"_emailId","type":"string"},{"name":"_contactNumber","type":"uint8"},{"name":"_contactAddress","type":"string"}],"name":"setDoctorInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_contractAddress","type":"address"}],"name":"setPatientContractAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"PTContractAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"AllDoctors","outputs":[{"name":"doctorId","type":"uint24"},{"name":"doctorName","type":"bytes32"},{"name":"doctorEmailId","type":"string"},{"name":"dContactNumber","type":"uint8"},{"name":"doctorAddress","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_docId","type":"uint24"},{"name":"_patientId","type":"uint24"}],"name":"checkAuthDoctor","outputs":[{"name":"check","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllDoctorsLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_docId","type":"uint24"}],"name":"getDoctorDetailsById","outputs":[{"name":"","type":"uint24"},{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"uint8"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_dName","type":"bytes32"}],"name":"getDoctorDetailsByName","outputs":[{"name":"","type":"uint24"},{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"uint8"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint24"}],"name":"getDoctorNameById","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_docId","type":"uint24"},{"name":"_patientId","type":"uint24"}],"name":"getPatientDetailsByDoctorId","outputs":[{"name":"id","type":"uint24"},{"name":"name","type":"bytes32"},{"name":"email","type":"string"},{"name":"contactNo","type":"uint8"},{"name":"contactAddress","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
  this.PTcontract="0x0efa07c64112b0dc2e9c1fb4616d0db53d4f22e6";
  this.PTcontractAbi= [{"constant":false,"inputs":[{"name":"_docId","type":"uint24"},{"name":"_patientId","type":"uint24"}],"name":"assignAuthDoctors_toPatient","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_docId","type":"uint24"},{"name":"_patientId","type":"uint24"}],"name":"revokeAuthDoctors_toPatient","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint24"},{"name":"_name","type":"bytes32"},{"name":"_emailId","type":"string"},{"name":"_contactNumber","type":"uint8"},{"name":"_contactAddress","type":"string"}],"name":"setPatientInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"AllPatient","outputs":[{"name":"patientId","type":"uint24"},{"name":"patientName","type":"bytes32"},{"name":"patientEmailId","type":"string"},{"name":"pContactNumber","type":"uint8"},{"name":"patientAddress","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_docId","type":"uint24"},{"name":"_patientId","type":"uint24"}],"name":"checkAuthDoctor","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllPatientLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_docId","type":"uint24"},{"name":"_patientId","type":"uint24"}],"name":"getPatientDetailsByDoctor","outputs":[{"name":"","type":"uint24"},{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"uint8"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_patientId","type":"uint24"}],"name":"getPatientDetailsById","outputs":[{"name":"","type":"uint24"},{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"uint8"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_pName","type":"bytes32"}],"name":"getPatientDetailsByName","outputs":[{"name":"","type":"uint24"},{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"uint8"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint24"}],"name":"getPatientNameById","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
}

saveDoctorsData(id,name,email,contact,address)
{
    this.web3.eth.contract(this.DocContractAbi).at(this.DocContract,function(error,result)
    {
      if(!error)
      {
        let val = result.setDoctorInfo(this.id,this.name,this.email,this.contact,this.address,function(err,res){
        if(!error)
        {
          console.log("Saving doctor information");
          this.toastr.info("submitted information");
          this.timeout(res);
        }
        else
        {
          this.toastr.info("Error in executing the operation");
        }
      }).bind(this);
      }
    }).bind(this);
}

timeout(hash)
{
      setTimeout(() => {

      var boundFunction = this.web3.eth.getTransactionReceipt (hash, function(error,result )  
      {
      console.log(error);           
      if(result!=null){
          this.toastr.success("Saved information successfully");
        }        
      else
          this.timeout(hash);           
    }.bind(this));

    }, 10*1000);
}

savePatientData(id,name,email,contact,address)
{
    this.web3.eth.contract(this.DocContractAbi).at(this.DocContract,function(error,result)
    {
      if(!error)
      {
        let val = result.setDoctorInfo(this.id,this.name,this.email,this.contact,this.address,function(err,res){
        if(!error)
        {
          console.log("Saving patient information");
          this.toastr.info("submitted information");
          this.timeout(res);
        }
        else
        {
          this.toastr.info("Error in executing the operation");
        }
      }).bind(this);
      }
    }).bind(this);
}

getPatientData(pId)
{
  this.web3.eth.contract(this.PTcontractAbi).at(this.PTcontract,function(error,result)
    {
      if(!error)
      {
        let val = result.getPatientDetailsById(this.pId,function(err,res){
        if(!error)
        {
          this.patientId = res[0].toNumber();
          this.pName = this.hex_to_ascii(res[1]);
          this.pEmail = res[2];
          this.pContact = res[3].toNumber();
          this.pAddress = res[4];
        }
        else
        {
          this.toastr.info("Error in executing the operation");
        }
      }).bind(this);
      }
    }).bind(this);  
}

getDoctorData(dId)
{
  this.web3.eth.contract(this.DocContractAbi).at(this.DocContract,function(error,result)
    {
      if(!error)
      {
        let val = result.getDoctorDetailsById(this.dId,function(err,res){
        if(!error)
        {
          this.docId = res[0].toNumber();
          this.dName = this.hex_to_ascii(res[1]);
          this.dEmail = res[2];
          this.dContact = res[3].toNumber();
          this.dAddress = res[4];
        }
        else
        {
          this.toastr.info("Error in executing the operation");
        }
      }).bind(this);
      }
    }).bind(this);  
}

// Type will be "D" if its Doctors data, "P" otherwise
saveDataViaApi(id,name,email,contact,address,type)
{
    var XMLHttp = new XMLHttpRequest();                       
    XMLHttp.open("GET","https://localhost:444/saveData/"+ id + "/" + name + "/" + email+"/"+contact+"/"+address+"/"+type, true);
    XMLHttp.timeout = 0;
    XMLHttp.onload = () => 
    {
    var finalResult = JSON.parse(XMLHttp.responseText);
      if(finalResult == "1")
      {
        console.log("Data saved successfully");
      }
    };
    XMLHttp.send(null);
}

// Get Ascii data from Hex data
hex_to_ascii(str1)  
{
  if(str1 == "")
  {
    return str1;
  }
  else
  {
      var hex  = str1.toString();  
      var str = '';   
      for (var n = 0; n < hex.length; n += 2) {  
          str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));  
      }
       str1 = "";
      
      for(var i=0;i<str.length;i++)
      {
          if(str.charCodeAt(i)!=0)
              {
              
                  str1+=str[i];
              }
      }  
      return str1;
  }
            
}





}





}

