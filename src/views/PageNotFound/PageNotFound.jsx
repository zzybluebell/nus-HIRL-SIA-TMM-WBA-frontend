import React from 'react'
import './PageNotFound.scss'
import { NavLink } from 'react-router-dom'

export default function PageNotFound() {

    return (
        <div class="not-found-page">
            <div class="align-center">
                <h1 class="text-muted">404</h1>
                <h4 class="text-found">Page Not Found</h4>
                <h6 class="text-center">The page you were looking for doesn't exist.</h6>
                <NavLink to="/layout/dashboard">Back to Dashboard</NavLink>
            </div>
        </div>
    )
}
