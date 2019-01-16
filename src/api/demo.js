import $http from '@/bootstrap/loadhttp';
import { resource } from '@/store-helper';

export default resource($http, '/api/v1');
