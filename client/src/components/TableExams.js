import React, { Component } from 'react'
import './table.css'


class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      isLoading: false,
      isError: false,
      isSelected: false,
      searchTerm: '',
      
    }
    this.onClick = this.onClick.bind(this);
  }
/* responsible for toggling the stlye on an exam card */

  onClick() {
    this.setState({
      isSelected: !this.state.isSelected
    });

  }
/* fetching exams */
  async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch('http://localhost:3001/exams');
    if (response.ok) {
      const exams = await response.json()
      console.log(exams)
      this.setState({ exams, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
      //console.log(error)

    }
  }


/**Rendering an exam card */
  examRecordCard = () => {
  //filtering the exam list by what was entered in the search box, which is stored under state searchTerm
    return this.state.exams.filter((val)=>{
      if(this.state.searchTerm=="") {
        return val
      }else if ((val._id).includes(this.state.searchTerm) ||
       (val.patientID).includes(this.state.searchTerm) ||
       (val.keyFindings.toLowerCase()).includes(this.state.searchTerm.toLowerCase())){
        return val
      }
    }).map(exam => { 
      return (
          /*My problem is here: this is responsible for toggling the class
          refer to line 20 for onClick function, and 12 for the state property.*/
        <div className ={ this.state.isSelected ? "exam-card-highlight": "exam-card"} key={exam._id} onClick={this.onClick}>
          
          <div className="card-item xray-box">
            <img className="xray" src={exam.xRayImageLink} alt="xRayImage"/>
          </div>
          <div className="spacer"/>
          <div className="card-item brixia-scores"><span>{exam.brixiaScores}</span></div>
          <div className="spacer"/>
          <div className="card-item exam-id"><a><span>{exam._id}</span></a></div>
          <div className="spacer"/>
          <div className="card-item patient-id"><a><span>{exam.patientID}</span></a></div>
          <div className="spacer"/>
          <div className="card-item key-findings"><span>{exam.keyFindings}</span></div>
          <div className="spacer"/>
          <div className="card-item age"><span>23</span></div>
          <div className="spacer"/>
          <div className="card-item sex"><span>F</span></div>
          <div className="spacer"/>
          <div className="card-item bmi"><span>21</span></div>
          <div className="spacer"/>
          <div className="card-item zip-code"><span>0000</span></div>
         
          
        </div>
        //not currently sure how to also include this patient data
        /*<div class="card-item age"><span>{exam.age}</span></div>
          <div class="card-item sex"><span>{exam.sex}</span></div>
          <div class="card-item bmi"><span>{exam.bmi}</span></div>
          <div class="card-item zip-code"><span>{exam.zipCode}</span></div>
          */

      )
    })
  }

  render() {
    const { exams, isLoading, isError } = this.state
    //const [searchTerm, setSearchTerm] = useState('')

    if (isLoading) {
      return <div class="loading">Loading Table...</div>
    }

    if (isError) {
      return <div>Error</div>

    }

    return exams.length > 0
      ? (
        //input tracking searchTerms
        <div class="container">
          
          <input type="text" placeholder="Search..." 
          value={this.state.searchTerm} 
          onChange={event => {
            this.setState({ searchTerm: event.target.value} )} }/>
          
          <div className = "header-exam">
           <div id="img-header">IMG</div>
           <div id="brixia-header">Brixia<br/> Scores</div>
           <div id="exam-header"> Exam ID</div>
           <div id="patient-header"> Patient ID</div>
           <div id="key-header"> Key Findings</div>
           <div id="age-header"> Age</div>
           <div id="sex-header"> Sex</div>
           <div id="bmi-header"> BMI</div>
           <div id="zip-header"> Zip Code</div>
          </div>
          
          <div class="list-exam">
          
          {this.examRecordCard()}
            

          </div>

        </div>
      ) : (
        <div>No exams.</div>
      )
  }


}

export default Table;

