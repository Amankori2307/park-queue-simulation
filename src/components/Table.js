import React from 'react'

function Table({ list }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item, index) => <tr key={index}>
                    <td>{item}</td>
                </tr>)}
            </tbody>
        </table>
    )
}

export default Table