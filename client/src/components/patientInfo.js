import React, { Component } from 'react'

class PatientInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
          patients: [],
          isLoading: false,
          isError: false,         
        }
        
      }


      
    /* fetching patient */
    async componentDidMount() {
        this.setState({ isLoading: true })
        var url = window.location.pathname
        console.log(url)
        var id = url.split("/")
        console.log(id[2])
        const response = await fetch('http://localhost:3001/patients/' + id[2]);
        if (response.ok) {
            const patients = await response.json()
            console.log(patients)
            console.log(typeof(patients))
            this.setState({ patients, isLoading: false })
            console.log(this.state.patients._id)
        } else {
            this.setState({ isError: true, isLoading: false })
            //console.log(error)

        }

    }



    patientData = () => {
        
        return this.state.patients.map(patient => {
            
            return (
                
                <div key={patient._id}>
                    <div>{patient._id}</div>
                    <div>{patient.name}</div>
                    <div>{patient.age}</div>
                    <div>{patient.sex}</div>
                    <div>{patient.email}</div>
                    <div>{patient.phoneNumber}</div>
                    <div>{patient.address}</div>
                    <div>{patient.city}</div>
                    <div>{patient.state}</div>
                    <div>{patient.zipCode}</div>
                </div>

            )
        })
    }

    


    render() {
        const { patients, isLoading, isError } = this.state
        console.log(patients.length)
        //const [searchTerm, setSearchTerm] = useState('')
    
        if (isLoading) {
          return <div class="loading">Loading Patient...</div>
        }
    
        if (isError) {
          return <div>Error</div>
    
        }
    
        return  patients.length > 0 ? (
            //input tracking searchTerms
            <div>
              {this.patientData()}
    
            </div>
          ) : (
            <div>No patients</div>
          )
      }
}

export default PatientInfo
