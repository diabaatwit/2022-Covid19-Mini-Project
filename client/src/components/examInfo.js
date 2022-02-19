import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './exam-card.css'

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

            <div id="exampage-container">
              <div> 
                <p id="exampage-label"> Exam Details</p><br/>
              </div>

                <div id="cards-container">
                  {/* Patient Card */}
                  <div class="card-container">
                    <div class="card-title-container">
                          <div>
                            <img src={require('../images/patient-icon.png')} alt="Patient Icon" />
                          </div>
                          <div>
                            <p>Patient</p>
                          </div>
                    </div>

                    <div class="card-data-container">
                      <div class='row'>
                        <div class='column'>
                          <div class='title-column'>
                            Patient ID
                          </div>
                          <div class='title-column'>
                            Age
                          </div>
                          <div class='title-column'>
                            Sex
                          </div>
                          <div class='title-column'>
                            BMI
                          </div>
                          <div class='title-column'>
                            Zip Code
                          </div>
                      </div>
                      <div class='column'>
                        <div class='data-column'>
                          {this.state.exams[0]._id}
                        </div>
                        <div class='data-column'>
                          XX
                        </div>
                        <div class='data-column'>
                          M/F/I
                        </div>
                        <div class='data-column'>
                          XX
                        </div>
                        <div class='data-column'>
                          02111
                        </div>
                        </div>
                      </div>  
                    </div>
                  </div>

                  {/* Exam Card */}
                  <div class="card-container">
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
                          </div>
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
                          XX-XX-202X
                        </div>
                        <div class='data-column'>
                          <p id="brixia-background">{this.state.exams[0].brixiaScores}</p>
                        </div>
                        <div class='data-column' id="key-findings">
                          {this.state.exams[0].keyFindings}
                        </div>
                      </div>
                      </div>  
                    </div>
                  
                  </div>
                
                  {/* X-Ray Image Card */}
                  <div class="xray-card">
                    <img class="xray-image" src={this.state.exams[0].xRayImageLink} alt="xRayImage"/>
                    <div id="examimage-link"><Link to={this.state.exams[0].xRayImageLink} target="_blank" rel="noopener noreferrer"><span>View Full Image</span></Link></div>
                  </div>
              </div>   
            </div>


          ) : (
            <div>No exams</div>
          )
      }
}

export default ExamInfo
