import React from 'react';
import {Link} from 'gatsby'
import { rhythm } from '../utils/typography';

export default function Tag({tag}) {
    return (
        <Link to={`/tags/${tag}`} style={{marginRight: rhythm(0.25)}}>#{tag}</Link>
    )
}