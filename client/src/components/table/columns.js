/**
 * Responsible for column layout
 */
export const COLUMNS = [
    {
        Header: 'Patient name',
        accessor: 'patientID'
    },
    {
        Header: 'Exam ID',
        accessor: '_id'
    },
    {
        Header: 'X-Ray URL',
        accessor: 'xRayImageLink'
    },
    {
        Header: 'Key Findings',
        accessor: 'keyFindings'
    },
    {
        Header: 'Brixia Score',
        accessor: 'brixiaScores'
    },
    {
        Header: 'Age',
        accessor: 'age'
    },
    {
        Header: 'Sex',
        accessor: 'sex'
    },
    {
        Header: 'BMI',
        accessor: 'BMI'
    },
    {
        Header: 'Zipcode',
        accessor: 'zipCode'
    },
    {
        Header: '',
        accessor: 'button'
    }
]