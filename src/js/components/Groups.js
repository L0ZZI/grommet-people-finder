// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var DirectoryList = require('./DirectoryList');

var LDAP_BASE = {
  url: encodeURIComponent('ldap://ldap.hp.com'),
  base: encodeURIComponent('ou=groups,o=hp.com'),
  scope: 'sub'
};

var SCHEMA = [
  {attribute: 'cn', primary: true, uid: true},
  {attribute: 'description', secondary: true}
];

var Groups = React.createClass({

  propTypes: {
    searchText: React.PropTypes.string,
    onSelect: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    var filter = this._filterForSearch(this.props.searchText);
    return {filter: filter};
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.searchText !== this.props.searchText) {
      var filter = this._filterForSearch(newProps.searchText);
      this.setState({filter: filter});
    }
  },

  _filterForSearch: function (searchText) {
    var filter;
    if (searchText) {
      if (searchText[0] === '(') {
        // assume this is already a formal LDAP filter
        filter = encodeURIComponent(searchText);
      } else {
        filter = encodeURIComponent('(cn=*' + searchText + '*)');
      }
    }
    return filter;
  },

  render: function() {
    return (
      <DirectoryList base={LDAP_BASE} schema={SCHEMA}
        filter={this.state.filter} onSelect={this.props.onSelect} />
    );
  }

});

module.exports = Groups;
