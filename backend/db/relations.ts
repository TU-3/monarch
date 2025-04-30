import { relations } from "drizzle-orm/relations";
import { users, task, project, meetingMinutes, organization, organizationUser } from "./schema";

export const taskRelations = relations(task, ({ one }) => ({
	usersInAuth: one(users, {
		fields: [task.assignee],
		references: [users.id]
	}),
	project: one(project, {
		fields: [task.projectId],
		references: [project.id]
	}),
}));

export const usersInAuthRelations = relations(users, ({ many }) => ({
	tasks: many(task),
	organizations: many(organization),
	organizationUsers: many(organizationUser),
}));

export const projectRelations = relations(project, ({ one, many }) => ({
	tasks: many(task),
	meetingMinutes: many(meetingMinutes),
	organization: one(organization, {
		fields: [project.organizationId],
		references: [organization.id]
	}),
}));

export const meetingMinutesRelations = relations(meetingMinutes, ({ one }) => ({
	project: one(project, {
		fields: [meetingMinutes.projectId],
		references: [project.id]
	}),
}));

export const organizationRelations = relations(organization, ({ one, many }) => ({
	usersInAuth: one(users, {
		fields: [organization.owner],
		references: [users.id]
	}),
	projects: many(project),
	organizationUsers: many(organizationUser),
}));

export const organizationUserRelations = relations(organizationUser, ({ one }) => ({
	organization: one(organization, {
		fields: [organizationUser.organizationId],
		references: [organization.id]
	}),
	usersInAuth: one(users, {
		fields: [organizationUser.userId],
		references: [users.id]
	}),
}));