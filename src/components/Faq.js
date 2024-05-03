import React,{useState,useEffect} from 'react'

export default function Faq(prop) {

  return (
    <>
    <div className="accordion" id="accordionExample" >
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      <strong>About the Project</strong>
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div className="accordion-body" >
        This is a Website to Practice Touch-Type and after login it saves user past error history ,which includes the alpahabet on which user made mistake while typeing
        and also the alphabet previous to it (as attempt to type  previous alphabet can cause the loss of finger posture) for ex. in "apple" if you made mistake at "l",then it will save "pl"
        ,and then will use an intelligent algorithm to give you similar words to practice the words on which you made mistake,because <strong> those who do not learn from past 
        are doomed to repeat it.</strong>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" >
        <strong>Website Map</strong>
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body" >
        Website has following component:<br/>
        <strong># Homepage</strong>  <br/>
        <strong># About </strong> <br/>
        <strong>(-- Inside Dropdown--) </strong><br/>
        <strong># Show Profile </strong> (If not logged in Show Profile you will be directed to login page) <br/>  
        <strong># Login</strong>  (Go to login Page to register as New User)<br/>
       </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" >
        <strong>Tech Stack</strong>
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body" >
        <strong>Technology Used :</strong><br/>
        <strong># HTML,CSS,JavaScript</strong><br/>
        <strong># React Frontend</strong><br/>
        <strong># Flask Backend</strong><br/>
        <strong># Mongo DB server</strong><br/>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" >
        <strong>About the Admin</strong>
      </button>
    </h2>
    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body" >
        <strong># Name: Niraj Kumar </strong><br/>
        <strong># Education: Mechanical Engineering,</strong><br/>
        <strong># Institute: IIT -BHU,Varansi</strong><br/>
        <strong># Interests: Building Creative Products,Machine Learning, Competitive Programming </strong><br/>
      </div>
    </div>
  </div>
</div></>
  )
}
