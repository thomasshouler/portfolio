import * as firebase from 'firebase/app';
import 'firebase/storage';

export const getImages = (projectId) => firebase
  .storage()
  .ref('my-projects/' + projectId)
  .listAll()
  .then(async result => {
    return await result.items.map(async item => {
      const image = {projectId: projectId};
      await item.getMetadata().then(metadata => image['id'] = metadata.generation);
      await item.getDownloadURL().then(url => image['url'] = url);
      return image;
    });
  });