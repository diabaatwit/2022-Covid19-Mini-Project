import React, { Component } from 'react'
import Table from './TableExams'

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



    examData = () => {
        
        return this.state.exams.map(exam => {
            
            return (
                
                <div key={exam._id}>
                    <div>{exam._id}</div>
                    <div>{exam.numHours}</div>
                    <div><img src={exam.xRayImageLink} alt="xRayImage"/></div>
                    <div>{exam.keyFindings}</div>
                    <div>{exam.brixiaScores}</div>
                    <div>{exam.patientID}</div>
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
            //input tracking searchTerms
            <div>
              {this.examData()}
    
            </div>
          ) : (
            <div>No exams</div>
          )
      }
}

export default ExamInfo
