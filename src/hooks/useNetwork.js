import {useEffect, useRef, useState} from 'react';
import debugLog from '../libs/log';
import {con} from '../libs/services';

export const useNetwork = () => {
	const ref = useRef(null);
	const [value, setValue] = useState({
		returnValue: false,
		isInternetConnectionAvailable: false
	});

	useEffect(() => {
		if (!ref.current) {
			debugLog('GET_NETWORK[R]', {});
			ref.current = con({
				method: 'getStatus',
				parameters: {subscribe: true},
				onSuccess: res => {
					debugLog('GET_NETWORK[S]', res);
					setValue(res);
				},
				onFailure: err => {
					debugLog('GET_NETWORK[F]', err);
				}
			});
		}

		return () => {
			if (ref.current) {
				ref.current.cancel();
				ref.current = null;
			}
		};
	}, []);

	return value;
};
