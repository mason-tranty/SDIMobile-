import {AxiosResponse} from 'axios';
import {injectable, inject} from 'tsyringe';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {RxRemoteProvider} from '@core';
import {Credential} from '@domain';

import {SignInResponseData, SignInRequestData} from '../model';

export interface RemoteAuthenticationDataSource {
  /**
   * @method signIn
   *
   * @description Sign in user with phone
   */
  signIn(body: Credential): Observable<AxiosResponse<SignInResponseData>>;
}

@injectable()
export class ApiAuthenticationDataSource
  implements RemoteAuthenticationDataSource {
  constructor(
    @inject('ApiProvider')
    private readonly provider: RxRemoteProvider,
  ) {}
  signIn(data: Credential): Observable<AxiosResponse<SignInResponseData>> {
    const body: SignInRequestData = {
      vidagis_branch_id: '',
      vidagis_password: data.password,
      vidagis_uid_emailaddress: data.username,
    };
    return this.provider.post<SignInResponseData>('user/login', body);
  }
}
