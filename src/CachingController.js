import { useDispatch, useSelector, connect } from 'react-redux';

import {
  mapsActions
} from './store';
import { useEffectAsync } from './reactHelper';
import { TOKEN } from './common/util/constants';

const CachingController = () => {
  const authenticated = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  useEffectAsync(async () => {
    if (authenticated) {
      const response = await fetch('/v2/api/routes', {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      if (response.ok) {
        dispatch(mapsActions.setRoutes(await response.json()));
      } else {
        throw Error(await response.text());
      }
    }
  }, [authenticated]);

  return null;
};

export default connect()(CachingController);
