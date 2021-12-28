"use strict";

import { Component } from "react";

export function errorBoundary_(name) { return () => {
  class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { error: null };
    }
    render() {
      return this.props.render({
        error: this.state.error,
        dismissError: () => this.setState({ error: null })
      });
    }
  }
  ErrorBoundary.displayName = name;
  ErrorBoundary.getDerivedStateFromError = (error) => ({ error });
  return ErrorBoundary;
};   }
