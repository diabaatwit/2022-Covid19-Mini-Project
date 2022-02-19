import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './table.css'

class ExamInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
          exams: [],
          isLoading: false,
          isError: false,         
        }

      }
      
    /* fetching exam */
    async componentDidMount() {
        this.setState({ isLoading: true })
        var url = window.location.pathname
        console.log(url)
        var id = url.split("/")
        console.log(id[2])
        const response = await fetch('http://localhost:3001/exams/' + id[2]);
        if (response.ok) {
            const exams = await response.json()
            console.log(exams)
            console.log(typeof(exams))
            this.setState({ exams, isLoading: false })
        } else {
            this.setState({ isError: true, isLoading: false })
            //console.log(error)
        }

    }

    /* render exam data*/     
    examData = () => {
        return this.state.exams.map(exam => {
            return (
                <div key={exam._id}>
                    <div className="spacer"/>
                    <div>{exam._id}</div>
                    <div className="spacer"/>
                    <div>{exam.numHours}</div>
                    <div className="spacer"/>

                    <div>{exam.keyFindings}</div>
                    <div className="spacer"/>
                    <div className="card-item brixia-scores">{exam.brixiaScores}</div>
                    <div className="spacer"/>
                    <div>{exam.patientID}</div>

                    <div><img src={exam.xRayImageLink} alt="xRayImage"/></div>
                    <div className="spacer"/>

                </div>
            )
        })
    }

    render() {
        const { exams, isLoading, isError } = this.state
        console.log(exams.length)
        
        //const [searchTerm, setSearchTerm] = useState('')
    
        if (isLoading) {
          return <div class="loading">Loading Exam...</div>
        }
    
        if (isError) {
          return <div>Error</div>
    
        }
    
        return  exams.length > 0 ? (

            <div class="card-container">
              <div id="exampage-container"> 
                <p id="exampage-label"> Exam Details</p>
              </div>

              <div class="card-title-container">
                    <div>
                      <img src={require('../images/exam-icon.png')} alt="Exam Icon" />
                    </div>
                    <div>
                      <p>Exam</p>
                    </div>
              </div>

              <div class="card-data-container">
                <div class='row'>
                  <div class='column'>
                    <div class='title-column'>
                      Exam ID
                    </div><br/>
                    <div class='title-column'>
                      Date
                    </div>
                    <div class='title-column'>
                      Brixia Scores
                    </div>
                    <div class='title-column'>
                      Key Findings
                    </div>
                  </div>
                <div class='column'>
                  <div class='data-column'>
                    {this.state.exams[0]._id}
                  </div>
                  <div class='data-column'>
                    Feb-19-2022 (placeholder)
                  </div>
                  <div class='data-column'>
                  {this.state.exams[0].brixiaScores}
                  </div>
                  <div class='data-column'>
                  {this.state.exams[0].keyFindings}
                  </div>
                </div>
              </div>  
              </div>

              {/*               
              <div id="exampage-container">
                <p id="exampage-label"> Exam ID:  {this.state.exams[0]._id}</p>
              </div> */}
          
              {/* <div className = "exampage-details">
                <div> Patient ID: {this.state.exams[0].patientID}</div>
                <div > Age: {this.state.exams[0].patientID}</div>     
                <div id="sex"> Sex: </div>
                <div id="bmi"> BMI: </div>
                <div id="zipcode"> Zip Code: </div>

                <div id="brixia-header">Brixia Scores: {this.state.exams[0].brixiaScores}</div>
                <div id="key-header"> Key Findings:</div>
                <div id="key-findings"> {this.state.exams[0].keyFindings}</div>
              </div> */}
            
              <div class="exampage-xraycard">
                <img class="xray-image" src={this.state.exams[0].xRayImageLink} alt="xRayImage"/>
                <div id="examimage-link"><Link to={this.state.exams[0].xRayImageLink} target="_blank" rel="noopener noreferrer"><span>View Full Image</span></Link></div>
              </div>
   
            </div>
          ) : (
            <div>No exams</div>
          )
      }
}

export default ExamInfo
