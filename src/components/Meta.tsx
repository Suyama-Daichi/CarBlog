import NextLink from "next/link";
import { IAuthor, ICategory, ITag } from "@types";
import { formatDate } from "@src/utils";
import Img from "next/image";

type MetaProps = {
  category?: ICategory;
  author?: IAuthor;
  createdAt?: string;
  tags?: ITag[];
  isDetail?: boolean;
};

export const Meta: React.FC<MetaProps> = (props) => {
  return (
    <div>
      <div className="upper">
        {props.category &&
          (props.isDetail ? (
            <NextLink href={`/category/${props.category.id}/page/1`}>
              <a className="category">{props.category.name}</a>
            </NextLink>
          ) : (
            <span className="category">{props.category.name}</span>
          ))}
        <ul className="tag">
          {props.tags &&
            props.tags.map((tag, _) => (
              <li key={tag.id}>
                {props.isDetail ? (
                  <NextLink href={`/tag/${tag.id}/page/1`}>
                    <a>{tag.name}</a>
                  </NextLink>
                ) : (
                  <span>{tag.name}</span>
                )}
              </li>
            ))}
        </ul>
      </div>

      <div className="meta">
        <span className="timestamp">
          <Img
            width={20}
            height={20}
            src="/images/icon_clock.svg"
            alt="clock"
          />
          <time dateTime={formatDate(props.createdAt ?? "", "YYYY-MM-DD")}>
            {formatDate(props.createdAt ?? "", "YYYY/MM/DD")}
          </time>
        </span>
        {props.author && (
          <span className="author">
            <Img
              width={20}
              height={20}
              src="/images/icon_author.svg"
              alt="author"
            />
            {props.author.name}
          </span>
        )}
      </div>
    </div>
  );
};
