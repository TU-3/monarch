import { pgSchema, pgTable, foreignKey, bigint, timestamp, varchar, text, uuid, unique, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const taskStatus = pgEnum("task-status", ['Backlog', 'To-do', 'In Progress', 'Review', 'Done'])

const authSchema = pgSchema("auth");

export const users = authSchema.table("users", {
	id: uuid("id").primaryKey(),
	email: varchar("email", { length: 256 }).notNull().unique(),
});

export const task = pgTable("task", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "task_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: varchar().notNull(),
	description: text().notNull(),
	assignee: uuid().default(sql`auth.uid()`),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	projectId: bigint("project_id", { mode: "number" }).notNull(),
	status: taskStatus().default('Backlog').notNull(),
}, (table) => [
	foreignKey({
		columns: [table.assignee],
		foreignColumns: [users.id],
		name: "task_assignee_fkey"
	}),
	foreignKey({
		columns: [table.projectId],
		foreignColumns: [project.id],
		name: "task_project_id_fkey"
	}),
]);

export const meetingMinutes = pgTable("meeting-minutes", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "meeting-minutes_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	title: varchar().default("").notNull(),
	file: text().default("").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	projectId: bigint("project_id", { mode: "number" }).notNull(),
}, (table) => [
	foreignKey({
		columns: [table.projectId],
		foreignColumns: [project.id],
		name: "meeting-minutes_project_id_fkey"
	}),
]);

export const organization = pgTable("organization", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "organizations_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: varchar().notNull(),
	owner: uuid().default(sql`auth.uid()`).notNull(),
}, (table) => [
	foreignKey({
		columns: [table.owner],
		foreignColumns: [users.id],
		name: "organizations_owner_fkey"
	}),
	unique("duplicateorganizations").on(table.name, table.owner),
]);

export const project = pgTable("project", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "project_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	organizationId: bigint("organization_id", { mode: "number" }).notNull(),
	name: varchar().notNull(),
	description: text(),
}, (table) => [
	foreignKey({
		columns: [table.organizationId],
		foreignColumns: [organization.id],
		name: "project_organization_id_fkey"
	}),
]);

export const organizationUser = pgTable("organization_user", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "organization_user_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	userId: uuid("user_id").default(sql`auth.uid()`).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	organizationId: bigint("organization_id", { mode: "number" }).notNull(),
}, (table) => [
	foreignKey({
		columns: [table.organizationId],
		foreignColumns: [organization.id],
		name: "organization_user_organization_id_fkey"
	}),
	foreignKey({
		columns: [table.userId],
		foreignColumns: [users.id],
		name: "organization_user_user_id_fkey"
	}),
]);
