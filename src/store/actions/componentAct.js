import { toast } from "react-toastify";
import { getDataAPINT } from "../../utils/fetchApi";
import { setTags, setCategories } from "../slice/component";


export const SetCategoriesAndTags = () => async (dispatch) => {
  try {

    const tagsRes = await getDataAPINT("tags");
    if (tagsRes.data && tagsRes.data.tags && tagsRes.data.tags.length > 0) {
      dispatch(setTags(tagsRes.data.tags));
    }
    const categoryRes = await getDataAPINT("categories");
    if (
      categoryRes.data &&
      categoryRes.data.categories &&
      categoryRes.data.categories.length > 0
    ) {
      dispatch(setCategories(categoryRes.data.categories));
    }
  } catch (err) {

    toast.error("gagal mendapatkan data tags dan categories");
  } 
};
