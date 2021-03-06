import {
  signOutFailed,
  signOutSuccess,
} from './../actions/authentication.action';
import {Epic, combineEpics} from 'redux-observable';
import {container} from 'tsyringe';
import {of, concat} from 'rxjs';
import {filter, catchError, switchMap, map} from 'rxjs/operators';

import {AppDependencies} from '@di';
import {SignInUseCase, SignOutUseCase} from '@domain';

import {
  AuthenticationEpicActions,
  signInSuccess,
  signInFailed,
  signIn,
  signInBegin,
  signInLocally,
  signInLocallyFailed,
  signInLocallySuccess,
  signOut,
} from '../actions';

const signInEpic$: Epic<AuthenticationEpicActions> = (action$) =>
  action$.pipe(
    filter(signIn.match),
    switchMap((action) => {
      const useCase = container.resolve<SignInUseCase>(
        AppDependencies.SignInUseCase,
      );
      return concat(
        of(signInBegin()),
        useCase.call(action.payload).pipe(
          map(signInSuccess),
          catchError((e) => {
            console.log(e);
            return of(signInFailed());
          }),
        ),
      );
    }),
  );
const signInLocallyEpic$: Epic<AuthenticationEpicActions> = (action$) =>
  action$.pipe(
    filter(signInLocally.match),
    switchMap(() => {
      const useCase = container.resolve<SignInUseCase>(
        AppDependencies.SignInUseCase,
      );
      return useCase.call().pipe(
        map(signInLocallySuccess),
        catchError((e) => {
          console.log(e);
          return of(signInLocallyFailed());
        }),
      );
    }),
  );
const signOutEpic$: Epic<AuthenticationEpicActions> = (action$) =>
  action$.pipe(
    filter(signOut.match),
    switchMap(() => {
      console.warn('useCase');
      const useCase = container.resolve<SignOutUseCase>(
        AppDependencies.SignOutUseCase,
      );
      return useCase.call().pipe(
        map(signOutSuccess),
        catchError((e) => {
          console.log(e);
          return of(signOutFailed());
        }),
      );
    }),
  );

export const authenticationEpic = combineEpics(
  signInEpic$,
  signInLocallyEpic$,
  signOutEpic$,
);
