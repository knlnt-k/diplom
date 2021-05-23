import { CommentsTasks } from "@/infrastructure/comments-tasks/i-external";
import { IComment } from "@/infrastructure/comments-tasks/i-internal";
import {
  dateToString,
  timestampToDate
} from "@/infrastructure/services/timestamp-to-date";

export const commentsTasksInternal: (
  commentsTasks: CommentsTasks
) => IComment = commentsTasks => {
  return {
    id: commentsTasks.id || 0,
    taskID: commentsTasks.task_id,
    userID: commentsTasks.user_id,
    comment: commentsTasks.comment,
    created: {
      seconds: (commentsTasks.created || 0) * 1000,
      getString(format: string): string {
        return dateToString(format, timestampToDate(this.seconds));
      }
    }
  } as IComment;
};
