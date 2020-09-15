import React, { useState, FormEvent, useEffect } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

import { Title, Form, Repositories, Error } from './style'

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {

    const [newRepo, setNewRepo] = useState('');

    const [inputError, setInputError] = useState('');

    const [repositories, setRepositories] = useState<Repository[]>(() => {

        const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories')

        if (storagedRepositories) {
            return JSON.parse(storagedRepositories);
        } else {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            '@GithubExplorer:repositories',
            JSON.stringify(repositories)
        )
    }, [repositories])

    async function handleAddRepository(event: FormEvent<HTMLFormElement>) {

        event.preventDefault();

        if (!newRepo) {
            setInputError('Seriously? Impossible search for a blank "user/repo"')
            return;
        }

        try {
            const response = await api.get<Repository>(`repos/${newRepo}`);

            const repository = response.data;

            setRepositories([...repositories, repository]);

            setNewRepo('');

            setInputError('');
        } catch (error) {
            setInputError('Repo and/or User may not exist, please check the input and try again!')
        }

    }

    return (
        <>
            <img src={logoImg} alt="Github Exporer" />
            <Title>Explore Github's repositories</Title>

            <Form hasError={Boolean(inputError)} onSubmit={handleAddRepository}>
                <input
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                    placeholder="Type user and repo name e.g. 'user/repo'" />
                <button type="submit">Search</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {repositories.map(repository => (
                    <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login} />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Repositories>

            <footer>
                Developed with ❤️ by <a href="https://github.com/stgonzales/github-explorer">Gonzales!</a>
            </footer>
        </>
    )
}

export default Dashboard