/* eslint-disable unicorn/filename-case */
import { Env } from '@env';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosPromise } from "axios"

import { type Datas } from '../interfaces/Datas';

const postData = async (data: Datas): AxiosPromise<any> => {
  const response = await axios.post(Env.API_URL + '/food', data);
  return response;
}

export function useDataMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData,
    retry: 2,
    onSuccess: () => {
      // refetches posts after a successful update
      queryClient.invalidateQueries({ queryKey: ['datas'] })
    }
  })

  return mutate;
}
/*
import { useDataMutate } from '../../hooks/useDataMutate';
import { Data } from '../../interface/Data';

const [title, setTitle] = useState("");
const [price, setPrice] = useState(0);
const [image, setImage] = useState("");
const { mutate, isSuccess, isLoading } = useFoodDataMutate();

const submit = () => {
  const foodData: FoodData = {
      title, 
      price,
      image
  }
  mutate(foodData)
}
  */