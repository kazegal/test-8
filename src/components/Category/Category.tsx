import { NavLink } from "react-router-dom";
import { CATEGORIES } from "../../constants";

interface CategoryProps {
  categoryId: string;
  title: string;
}

const Category: React.FC<CategoryProps> = () => {
  return (
      <>
        <div className="card p-3">
          <NavLink className="btn btn-primary mb-2" to="/">
            All
          </NavLink>
          {CATEGORIES.map((key) => (
              <NavLink
                  className="btn btn-primary mb-2"
                  to={`/quotes/${key.id}`}
                  key={key.id}
              >
                {key.title}
              </NavLink>
          ))}
        </div>
      </>
  );
};

export default Category;
