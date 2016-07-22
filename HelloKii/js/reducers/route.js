'use strict';

import type { Action } from '../actions/types';
import { globalNav } from '../AppNavigator';
import { POP_ROUTE, REPLACE_ROUTE, REPLACE_OR_PUSH_ROUTE } from '../actions/route';
import { REHYDRATE } from 'redux-persist/constants'

export type State = {
    routes: Array<string>
}

const initialState = {
    routes: ['login']
};

export default function (state:State = initialState, action:Action): State {

    if (action.type === REPLACE_ROUTE) {
        globalNav.navigator.replace({id: action.route});
        let routes = state.routes;
        routes.pop();
        return {
            routes: [...routes, action.route]
        };
    }

    if (action.type === REPLACE_OR_PUSH_ROUTE) {
        let routes = state.routes;
        
        if(routes[routes.length - 1] == 'home') {
            if(action.route != 'home')
                globalNav.navigator.push({id: action.route});
            else
                routes = [];
        }

        else {
            if(action.route == 'home') {
                globalNav.navigator.resetTo({id: 'home'});
                routes = [];
            } else if(action.route == 'todoPage') {
                globalNav.navigator.resetTo({id: 'todoPage'});
                routes = [];
            }
            else {
                globalNav.navigator.replace({id: action.route});
                routes.pop();
            }
        }

        return {
            routes: [...routes, action.route]
        };
    }

    if (action.type === POP_ROUTE) {
        globalNav.navigator.pop();
        let routes = state.routes;
        routes.pop();
        return {
            routes: routes
        }
    }

    return state;
}
