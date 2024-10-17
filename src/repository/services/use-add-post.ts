import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from './client';
import type { Post } from './types';

type Variables = { title: string; body: string; userId: number };
type Response = Post;

export const useAddPost = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'posts/add',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});

/*
import { useAddPost } from '@/api';

  const { mutate: addPost, isPending } = useAddPost();

  const onSubmit = (data: FormType) => {
    console.log(data);
    addPost(
      { ...data, userId: 1 },
      {
        onSuccess: () => {
          showMessage({
            message: 'Post added successfully',
            type: 'success',
          });
          // here you can navigate to the post list and refresh the list data
          //queryClient.invalidateQueries(usePosts.getKey());
        },
        onError: () => {
          showErrorMessage('Error adding post');
        },
      }
    );
  };

  {
  title: '',  
  body: '', 
  userId: 1
  id: 0 
  }

    <Button
          label="Add Post"
          loading={isPending}
          onPress={handleSubmit(onSubmit)}
          testID="add-post-button"
        />
*/