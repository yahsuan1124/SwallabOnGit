
import React from 'react';
import {Text} from 'react-native';

let myReactRoot = ReactDOM.createRoot(document.getElementById('root'));

        function App() {
            const [data, setData] = React.useState([]);

            React.useEffect(() => {
                fetch('http://localhost/swallab/Swallab/php/history.php'
                // ,
                //     {
                //         method: 'GET',
                //         headers: {
                //             'Content-Type': 'application/json'
                //         }
                //     }
                )
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        else { console.log(response) }
                        return response.json();
                    })
                    .then(data => setData(data))
                    .catch(error => console.error('Fetch error:', error));
            }, []);

            return (
                <div>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <div key={index}>
                                <p>ID: {item.m_n_id}</p>
                                <p>Name: {item.name}</p>
                                <p>Email: {item.email}</p>
                            </div>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            );
        }

        myReactRoot.render(
            <App />
        );