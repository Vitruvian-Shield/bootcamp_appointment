import React from "react";
import './specials.css';
import childicon from '../assets/images/childicon.svg'
import kidneyicon from '../assets/images/kindeyicon.svg'
import digestionicon from '../assets/images/digestion.svg'
import teethicon from '../assets/images/teethicon.svg'
import nutritionicon from '../assets/images/nutritionicon.svg'
import midwiferyicon from '../assets/images/midwiferyicon.svg'
import eyeicon from '../assets/images/eyeicon.svg'
import earicon from '../assets/images/earicon.svg'
import orthopedicsicon from '../assets/images/orthopedicsicon.svg'
import talkicon from '../assets/images/talkicon.svg'
import skinIcon from '../assets/images/skeenIcon.svg'
import psychologist from '../assets/images/psychologisticon.svg'
import internaldoctoricon from '../assets/images/internaldoctoricon.svg'
import neurologisticon from '../assets/images/neurologisticon.svg'
import urologyicon from '../assets/images/urologyicon.svg'
import doctorsicon from '../assets/images/doctorsicon.svg'
import radiologyicon from '../assets/images/radiologyicon.svg'
import sonographyicon from '../assets/images/sonographyicon.svg'
import endocrinologyicon from '../assets/images/endocrinologyicon.svg'
import lungsicon from '../assets/images/lungsicon.svg'


function Speciality() {
  const specialties = [
    { id: 1, name: "متخصص اطفال", icon:childicon},
    { id: 2, name: "فوق تخصص کلیه", icon:kidneyicon},
    { id: 3, name: "متخصص گوارش", icon:digestionicon},
    { id: 4, name: "متخصص تغذیه", icon:nutritionicon},
    { id: 5, name: "دندان پزشک", icon:teethicon},
    { id: 6, name: "متخصص مامایی", icon:midwiferyicon},
    { id: 7, name: "چشم پزشک", icon:eyeicon},
    { id: 8, name: "گوش و حلق و بینی", icon:earicon},
    { id: 9, name: "دکتر متخصص گفتار درمان", icon:talkicon},
    { id: 10, name: "روانشناس", icon:psychologist},
    { id: 11, name: "متخصص ارتوپدی", icon:orthopedicsicon},
    { id: 12, name: "متخصص پوست ، مو و زیبایی", icon:skinIcon},
    { id: 13, name: "دکتر داخلی", icon:internaldoctoricon},
    { id: 14, name: "متخصص ارولوژی", icon:urologyicon},
    { id: 15, name: "پزشک عمومی", icon:doctorsicon},
    { id: 16, name: "جراح مغز و اعصاب", icon:neurologisticon},
    { id: 17, name: "رادیوتراپیست", icon:radiologyicon},
    { id: 18, name: "متخصص غدد", icon:endocrinologyicon},
    { id: 19, name: "متخصص رادیولوژی و سونوگرافی", icon:sonographyicon},
    { id: 20, name: "متخصص ریه", icon:lungsicon}
  ];

  return (
    <div className="specialties-container">
      {specialties.map((spec) => (
        <div className="specialty-item" dir="rtl">
        <a onClick={()=>{localStorage.setItem('speciality', `${spec.name}`)}}href="/doctors" key={spec.id} className="specialty-link">
            <p><b><img src={spec.icon} alt="" /> {spec.name}</b></p>            
        </a> 
        </div>
        
      ))}
    </div>
  );
}

export default Speciality;
