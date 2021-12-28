"use strict";

import { useRef, Children, memo, useState, useEffect, useLayoutEffect, useReducer, useContext, useMemo, useDebugValue } from "react";

const useEqCache = (eq, a) => {
  const memoRef = useRef(a);
  if (memoRef.current !== a && !eq(memoRef.current, a)) {
    memoRef.current = a;
  }
  return memoRef.current;
};

export function reactChildrenToArray(children) { return Children.toArray(children); }

export const memo_ = memo;

export function useState_(tuple, initialState) {
  const r = useState(
    typeof initialState === 'function'
      ? (() => initialState)
      : initialState
  );
  const state = r[0];
  const setState = r[1];
  if (!setState.hasOwnProperty("$$reactBasicHooks$$cachedSetState")) {
    setState.$$reactBasicHooks$$cachedSetState = (update) => () =>
      setState(update);
  }
  return tuple(state, setState.$$reactBasicHooks$$cachedSetState);
}

export function useEffect_(eq, deps, effect) {
  const memoizedKey = useEqCache(eq, deps);
  useEffect(effect, [memoizedKey]);
}

export function useEffectAlways_(effect) { return useEffect(effect); }

export function useLayoutEffect_(eq, deps, effect) {
  const memoizedKey = useEqCache(eq, deps);
  useLayoutEffect(effect, [memoizedKey]);
}

export function useLayoutEffectAlways_(effect) { return useLayoutEffect(effect); }

export function useReducer_(tuple, reducer, initialState) {
  const r = useReducer(reducer, initialState);
  const state = r[0];
  const dispatch = r[1];
  if (!dispatch.hasOwnProperty("$$reactBasicHooks$$cachedDispatch")) {
    dispatch.$$reactBasicHooks$$cachedDispatch = (action) => () =>
      dispatch(action);
  }
  return tuple(state, dispatch.$$reactBasicHooks$$cachedDispatch);
}

export const useRef_ = useRef;

export function readRef_(ref) { return ref.current; }

export function writeRef_(ref, a) {
  ref.current = a;
}

export const useContext_ = useContext;

export const useEqCache_ = useEqCache;

export function useMemo_(eq, deps, computeA) {
  const memoizedKey = useEqCache(eq, deps);
  return useMemo(computeA, [memoizedKey]);
}

export const useDebugValue_ = useDebugValue;

export function unsafeSetDisplayName(displayName, component) {
  component.displayName = displayName;
  component.toString = () => displayName;
  return component;
}

export function displayName(component)  {   return typeof component === "string"
    ? component
    : component.displayName || "[unknown]";   }
