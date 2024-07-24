import {useState} from 'react';

export default function Form() {
    const [person, setPerson] = useState({
        firstName: 'Ji Wung',
        lastName: 'Kim',
        email: 'wonsu@naver.com'
    });

    function handleChange(e) {
        setPerson({
            ...person,
            [e.target.name]: e.target.value.slice(0, [e.target.maxLength])
        })
    }

    return (
        <>
            <label>
                이름 :
                <input
                    name="firstName"
                    value={person.firstName}
                    onChange={handleChange}
                    maxLength="20"
                />
            </label>
            <label>
                성 :
                <input
                    name="lastName"
                    value={person.lastName}
                    onChange={handleChange}
                    maxLength="20"
                />
            </label>
            <label>
                이메일 :
                <input
                    name="email"
                    value={person.email}
                    onChange={handleChange}
                    maxLength="30"
                />
            </label>
            <p>
                {person.firstName}{' '}
                {person.lastName}{' '}
                ({person.email})
            </p>
        </>
    );
}