import React, { Component } from 'react';
import axios from 'axios';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import api, {getAuth} from '../../../config'
import '../styles/_discover.scss';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      token: {},
      newReleases: [],
      playlists: [],
      categories: []
    };

    
  }

  async componentDidMount() {
    await this.auth()
    this.findNewReleases()
    this.findPlaylists()
    this.findCategories()
  }

  async auth() {
    const auth = await getAuth();
    this.setState({
      token:{
        headers: {
          'Authorization': 'Bearer '+ auth
        }
      }
    })
  }
  
  findNewReleases() {
    axios.get(api.api.baseUrl+'/browse/new-releases', this.state.token)
    .then((response) => {
      if(response.data.albums) {
        this.setState({
          newReleases: response.data.albums.items
        })
      }
    })
    .catch(function (error) {
        console.log('error', error)
    })
  }
  
  findPlaylists() {
    axios.get(api.api.baseUrl+'/browse/featured-playlists', this.state.token)
    .then((response) => {
      if(response.data.playlists) {
        this.setState({
          playlists: response.data.playlists.items
        })
      }
    })
    .catch(function (error) {
        console.log('error', error)
    })
  }
  
  findCategories() {
    axios.get(api.api.baseUrl+'/browse/categories', this.state.token)
    .then((response) => {
      if(response.data.categories) {
        this.setState({
          categories: response.data.categories.items
        })
      }
    })
    .catch(function (error) {
        console.log('error', error)
    })
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
