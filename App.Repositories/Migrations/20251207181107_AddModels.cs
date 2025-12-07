using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace App.Repositories.Migrations
{
    /// <inheritdoc />
    public partial class AddModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                table: "AspNetUserClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                table: "AspNetUserLogins");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                table: "AspNetUserTokens");

            migrationBuilder.DropForeignKey(
                name: "FK_UserSessions_AspNetUsers_UserId",
                table: "UserSessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserSessions",
                table: "UserSessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AspNetUsers",
                table: "AspNetUsers");

            migrationBuilder.RenameTable(
                name: "UserSessions",
                newName: "Users_UserSessions");

            migrationBuilder.RenameTable(
                name: "AspNetUsers",
                newName: "Users_Users");

            migrationBuilder.RenameIndex(
                name: "IX_UserSessions_UserId",
                table: "Users_UserSessions",
                newName: "IX_Users_UserSessions_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserSessions_SessionKey",
                table: "Users_UserSessions",
                newName: "IX_Users_UserSessions_SessionKey");

            migrationBuilder.RenameIndex(
                name: "IX_UserSessions_IsActive",
                table: "Users_UserSessions",
                newName: "IX_Users_UserSessions_IsActive");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUsers_UserType",
                table: "Users_Users",
                newName: "IX_Users_Users_UserType");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUsers_IsActive",
                table: "Users_Users",
                newName: "IX_Users_Users_IsActive");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "AspNetUserTokens",
                type: "integer",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "AspNetUserLogins",
                type: "integer",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "AspNetUserClaims",
                type: "integer",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Users_UserSessions",
                type: "integer",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Users_Users",
                type: "integer",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<string>(
                name: "AdvisorName",
                table: "Users_Users",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Department",
                table: "Users_Users",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Users_Users",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OrganizationId",
                table: "Users_Users",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Users_Users",
                type: "character varying(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RoleId",
                table: "Users_Users",
                type: "integer",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users_UserSessions",
                table: "Users_UserSessions",
                column: "SessionKey");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users_Users",
                table: "Users_Users",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "AuditLogs_AuditLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    Action = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    EntityType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    EntityId = table.Column<int>(type: "integer", nullable: false),
                    OldValues = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    NewValues = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    IpAddress = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    UserAgent = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLogs_AuditLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuditLogs_AuditLogs_Users_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users_Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Complaints_ComplaintCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Complaints_ComplaintCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Notifications_Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Message = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    RelatedEntityType = table.Column<string>(type: "varchar(20)", nullable: false),
                    RelatedEntityId = table.Column<int>(type: "integer", nullable: true),
                    ActionUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Notifications_Users_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users_Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Roles_Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Complaints_Complaints",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    ComplaintDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<string>(type: "varchar(20)", nullable: false),
                    Priority = table.Column<string>(type: "varchar(20)", nullable: false),
                    ComplainantId = table.Column<int>(type: "integer", nullable: false),
                    ComplainantName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    ComplainantDetails = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    ComplainantStudentId = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    AccusedStudentId = table.Column<int>(type: "integer", nullable: true),
                    AccusedName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    AccusedDetails = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CategoryId = table.Column<int>(type: "integer", nullable: true),
                    Location = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    IncidentDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Complaints_Complaints", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Complaints_Complaints_Complaints_ComplaintCategories_Catego~",
                        column: x => x.CategoryId,
                        principalTable: "Complaints_ComplaintCategories",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Complaints_Complaints_Users_Users_ComplainantId",
                        column: x => x.ComplainantId,
                        principalTable: "Users_Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Cases_CaseAssignments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ComplaintId = table.Column<int>(type: "integer", nullable: false),
                    AssignedTo = table.Column<int>(type: "integer", nullable: false),
                    AssignedBy = table.Column<int>(type: "integer", nullable: false),
                    AssignedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Deadline = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<string>(type: "varchar(20)", nullable: false),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cases_CaseAssignments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cases_CaseAssignments_Complaints_Complaints_ComplaintId",
                        column: x => x.ComplaintId,
                        principalTable: "Complaints_Complaints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cases_CaseAssignments_Users_Users_AssignedBy",
                        column: x => x.AssignedBy,
                        principalTable: "Users_Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Cases_CaseAssignments_Users_Users_AssignedTo",
                        column: x => x.AssignedTo,
                        principalTable: "Users_Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Cases_CaseFiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ComplaintId = table.Column<int>(type: "integer", nullable: false),
                    PreparedBy = table.Column<int>(type: "integer", nullable: false),
                    PreparedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Summary = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    Recommendations = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    Status = table.Column<string>(type: "varchar(20)", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cases_CaseFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cases_CaseFiles_Complaints_Complaints_ComplaintId",
                        column: x => x.ComplaintId,
                        principalTable: "Complaints_Complaints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cases_CaseFiles_Users_Users_PreparedBy",
                        column: x => x.PreparedBy,
                        principalTable: "Users_Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Complaints_ComplaintEvidences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ComplaintId = table.Column<int>(type: "integer", nullable: false),
                    FilePath = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    UploadedBy = table.Column<int>(type: "integer", nullable: false),
                    UploadedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Complaints_ComplaintEvidences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Complaints_ComplaintEvidences_Complaints_Complaints_Complai~",
                        column: x => x.ComplaintId,
                        principalTable: "Complaints_Complaints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Complaints_ComplaintEvidences_Users_Users_UploadedBy",
                        column: x => x.UploadedBy,
                        principalTable: "Users_Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Explanations_Explanations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ComplaintId = table.Column<int>(type: "integer", nullable: false),
                    SubmittedBy = table.Column<int>(type: "integer", nullable: false),
                    ExplanationText = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    SubmittedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsComplainant = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Explanations_Explanations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Explanations_Explanations_Complaints_Complaints_ComplaintId",
                        column: x => x.ComplaintId,
                        principalTable: "Complaints_Complaints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Explanations_Explanations_Users_Users_SubmittedBy",
                        column: x => x.SubmittedBy,
                        principalTable: "Users_Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Meetings_Meetings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ComplaintId = table.Column<int>(type: "integer", nullable: false),
                    ScheduledBy = table.Column<int>(type: "integer", nullable: false),
                    ScheduledAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DurationMinutes = table.Column<int>(type: "integer", nullable: false),
                    Location = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Agenda = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Status = table.Column<string>(type: "varchar(20)", nullable: false),
                    Outcome = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meetings_Meetings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Meetings_Meetings_Complaints_Complaints_ComplaintId",
                        column: x => x.ComplaintId,
                        principalTable: "Complaints_Complaints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Meetings_Meetings_Users_Users_ScheduledBy",
                        column: x => x.ScheduledBy,
                        principalTable: "Users_Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Cases_CaseFileDocuments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CaseFileId = table.Column<int>(type: "integer", nullable: false),
                    DocumentPath = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    DocumentType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    UploadedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cases_CaseFileDocuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cases_CaseFileDocuments_Cases_CaseFiles_CaseFileId",
                        column: x => x.CaseFileId,
                        principalTable: "Cases_CaseFiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Meetings_MeetingParticipants",
                columns: table => new
                {
                    MeetingId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Role = table.Column<string>(type: "varchar(20)", nullable: false),
                    Attended = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meetings_MeetingParticipants", x => new { x.MeetingId, x.UserId });
                    table.ForeignKey(
                        name: "FK_Meetings_MeetingParticipants_Meetings_Meetings_MeetingId",
                        column: x => x.MeetingId,
                        principalTable: "Meetings_Meetings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Meetings_MeetingParticipants_Users_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users_Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Users_Email",
                table: "Users_Users",
                column: "Email");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Users_OrganizationId",
                table: "Users_Users",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Users_RoleId",
                table: "Users_Users",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditLogs_AuditLogs_CreatedAt",
                table: "AuditLogs_AuditLogs",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_AuditLogs_AuditLogs_EntityId",
                table: "AuditLogs_AuditLogs",
                column: "EntityId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditLogs_AuditLogs_EntityType",
                table: "AuditLogs_AuditLogs",
                column: "EntityType");

            migrationBuilder.CreateIndex(
                name: "IX_AuditLogs_AuditLogs_UserId",
                table: "AuditLogs_AuditLogs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Cases_CaseAssignments_AssignedBy",
                table: "Cases_CaseAssignments",
                column: "AssignedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Cases_CaseAssignments_AssignedTo",
                table: "Cases_CaseAssignments",
                column: "AssignedTo");

            migrationBuilder.CreateIndex(
                name: "IX_Cases_CaseAssignments_ComplaintId",
                table: "Cases_CaseAssignments",
                column: "ComplaintId");

            migrationBuilder.CreateIndex(
                name: "IX_Cases_CaseAssignments_Status",
                table: "Cases_CaseAssignments",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Cases_CaseFileDocuments_CaseFileId",
                table: "Cases_CaseFileDocuments",
                column: "CaseFileId");

            migrationBuilder.CreateIndex(
                name: "IX_Cases_CaseFiles_ComplaintId",
                table: "Cases_CaseFiles",
                column: "ComplaintId");

            migrationBuilder.CreateIndex(
                name: "IX_Cases_CaseFiles_PreparedBy",
                table: "Cases_CaseFiles",
                column: "PreparedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Cases_CaseFiles_Status",
                table: "Cases_CaseFiles",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Complaints_ComplaintCategories_Name",
                table: "Complaints_ComplaintCategories",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Complaints_ComplaintEvidences_ComplaintId",
                table: "Complaints_ComplaintEvidences",
                column: "ComplaintId");

            migrationBuilder.CreateIndex(
                name: "IX_Complaints_ComplaintEvidences_UploadedBy",
                table: "Complaints_ComplaintEvidences",
                column: "UploadedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Complaints_Complaints_CategoryId",
                table: "Complaints_Complaints",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Complaints_Complaints_ComplainantId",
                table: "Complaints_Complaints",
                column: "ComplainantId");

            migrationBuilder.CreateIndex(
                name: "IX_Complaints_Complaints_ComplaintDate",
                table: "Complaints_Complaints",
                column: "ComplaintDate");

            migrationBuilder.CreateIndex(
                name: "IX_Complaints_Complaints_Priority",
                table: "Complaints_Complaints",
                column: "Priority");

            migrationBuilder.CreateIndex(
                name: "IX_Complaints_Complaints_Status",
                table: "Complaints_Complaints",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Explanations_Explanations_ComplaintId",
                table: "Explanations_Explanations",
                column: "ComplaintId");

            migrationBuilder.CreateIndex(
                name: "IX_Explanations_Explanations_SubmittedBy",
                table: "Explanations_Explanations",
                column: "SubmittedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Meetings_MeetingParticipants_MeetingId",
                table: "Meetings_MeetingParticipants",
                column: "MeetingId");

            migrationBuilder.CreateIndex(
                name: "IX_Meetings_MeetingParticipants_UserId",
                table: "Meetings_MeetingParticipants",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Meetings_Meetings_ComplaintId",
                table: "Meetings_Meetings",
                column: "ComplaintId");

            migrationBuilder.CreateIndex(
                name: "IX_Meetings_Meetings_ScheduledAt",
                table: "Meetings_Meetings",
                column: "ScheduledAt");

            migrationBuilder.CreateIndex(
                name: "IX_Meetings_Meetings_ScheduledBy",
                table: "Meetings_Meetings",
                column: "ScheduledBy");

            migrationBuilder.CreateIndex(
                name: "IX_Meetings_Meetings_Status",
                table: "Meetings_Meetings",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_Notifications_CreatedAt",
                table: "Notifications_Notifications",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_Notifications_IsRead",
                table: "Notifications_Notifications",
                column: "IsRead");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_Notifications_UserId",
                table: "Notifications_Notifications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_Roles_Name",
                table: "Roles_Roles",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserClaims_Users_Users_UserId",
                table: "AspNetUserClaims",
                column: "UserId",
                principalTable: "Users_Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserLogins_Users_Users_UserId",
                table: "AspNetUserLogins",
                column: "UserId",
                principalTable: "Users_Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserTokens_Users_Users_UserId",
                table: "AspNetUserTokens",
                column: "UserId",
                principalTable: "Users_Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Users_Roles_Roles_RoleId",
                table: "Users_Users",
                column: "RoleId",
                principalTable: "Roles_Roles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_UserSessions_Users_Users_UserId",
                table: "Users_UserSessions",
                column: "UserId",
                principalTable: "Users_Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserClaims_Users_Users_UserId",
                table: "AspNetUserClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserLogins_Users_Users_UserId",
                table: "AspNetUserLogins");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserTokens_Users_Users_UserId",
                table: "AspNetUserTokens");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Users_Roles_Roles_RoleId",
                table: "Users_Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_UserSessions_Users_Users_UserId",
                table: "Users_UserSessions");

            migrationBuilder.DropTable(
                name: "AuditLogs_AuditLogs");

            migrationBuilder.DropTable(
                name: "Cases_CaseAssignments");

            migrationBuilder.DropTable(
                name: "Cases_CaseFileDocuments");

            migrationBuilder.DropTable(
                name: "Complaints_ComplaintEvidences");

            migrationBuilder.DropTable(
                name: "Explanations_Explanations");

            migrationBuilder.DropTable(
                name: "Meetings_MeetingParticipants");

            migrationBuilder.DropTable(
                name: "Notifications_Notifications");

            migrationBuilder.DropTable(
                name: "Roles_Roles");

            migrationBuilder.DropTable(
                name: "Cases_CaseFiles");

            migrationBuilder.DropTable(
                name: "Meetings_Meetings");

            migrationBuilder.DropTable(
                name: "Complaints_Complaints");

            migrationBuilder.DropTable(
                name: "Complaints_ComplaintCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users_UserSessions",
                table: "Users_UserSessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users_Users",
                table: "Users_Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_Users_Email",
                table: "Users_Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_Users_OrganizationId",
                table: "Users_Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_Users_RoleId",
                table: "Users_Users");

            migrationBuilder.DropColumn(
                name: "AdvisorName",
                table: "Users_Users");

            migrationBuilder.DropColumn(
                name: "Department",
                table: "Users_Users");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Users_Users");

            migrationBuilder.DropColumn(
                name: "OrganizationId",
                table: "Users_Users");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Users_Users");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "Users_Users");

            migrationBuilder.RenameTable(
                name: "Users_UserSessions",
                newName: "UserSessions");

            migrationBuilder.RenameTable(
                name: "Users_Users",
                newName: "AspNetUsers");

            migrationBuilder.RenameIndex(
                name: "IX_Users_UserSessions_UserId",
                table: "UserSessions",
                newName: "IX_UserSessions_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_UserSessions_SessionKey",
                table: "UserSessions",
                newName: "IX_UserSessions_SessionKey");

            migrationBuilder.RenameIndex(
                name: "IX_Users_UserSessions_IsActive",
                table: "UserSessions",
                newName: "IX_UserSessions_IsActive");

            migrationBuilder.RenameIndex(
                name: "IX_Users_Users_UserType",
                table: "AspNetUsers",
                newName: "IX_AspNetUsers_UserType");

            migrationBuilder.RenameIndex(
                name: "IX_Users_Users_IsActive",
                table: "AspNetUsers",
                newName: "IX_AspNetUsers_IsActive");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "AspNetUserTokens",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "AspNetUserLogins",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "AspNetUserClaims",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "UserSessions",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "AspNetUsers",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserSessions",
                table: "UserSessions",
                column: "SessionKey");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AspNetUsers",
                table: "AspNetUsers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                table: "AspNetUserClaims",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                table: "AspNetUserLogins",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                table: "AspNetUserTokens",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserSessions_AspNetUsers_UserId",
                table: "UserSessions",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
