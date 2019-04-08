import React, { Component } from 'react'

import DisasterPosts from '../../compositions/DisasterPosts/DisasterPosts'
import { getPosts } from '../../api/api'
import About from '../../compositions/About/About'
import Contact from '../../compositions/Contact/Contact'

import './MainContainer.css'



class MainContainer extends Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            posts: [],
            tabIndex: 0,
            tabs: ['Gallery', 'About', 'Contact'],
        }
    }

    componentDidMount() {
        return this.getAllActivePosts()
    }

    getAllActivePosts = () => {
        getPosts().then(result => {
            this.setState(previousState => {
                return {
                    ...previousState,
                    posts: result.length > 0 ? result : []
                }
            })
        })
    }

    handleTabSelect = (index) => {
        this.setState(previousState => {
            return {
                ...previousState,
                tabIndex: index,
            }
        })
    }
    getActiveTab = (tabIndex, posts) => {
        switch(tabIndex) {
            case 0: {
                return <DisasterPosts posts={ posts } />
            }
            case 1: {
                return <Contact />
            }
            case 2: {
                return <About />
            }
            default: {

            }
        }
    }
    render() {
        const { posts, tabs, tabIndex } = this.state
        const inAppNavigation = tabs.map( (tab, index) => {
            const active = index === tabIndex ? 'active': ''
            return (
                <span key={`tab-nav-${index}`} onClick={ e => this.handleTabSelect(index) } className={`tabItem ${active}`}>{ tab }</span>
            )
        })
        const tabNavContainer = (
            <div className='tabNavContainer'>
                { inAppNavigation }
            </div>
        )
        let activeTab = this.getActiveTab(tabIndex, posts)
        
        return (
            <div className='MainContainer'>
                { tabNavContainer }
                { activeTab }
            </div>
        )
    }
}

export default MainContainer
