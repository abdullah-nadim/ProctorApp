namespace App.Models
{
    public enum UserTypes
    {
        Admin,
        Student,
        Proctor,
        CoordinationOfficer,
        AssistantProctor,
        User
    }

    public enum ComplaintStatus
    {
        Pending,
        UnderInvestigation,
        Resolved,
        Dismissed
    }

    public enum Priority
    {
        Low,
        Medium,
        High,
        Critical
    }

    public enum CaseAssignmentStatus
    {
        Pending,
        InProgress,
        Completed
    }

    public enum CaseFileStatus
    {
        Draft,
        Submitted,
        Reviewed
    }

    public enum MeetingStatus
    {
        Scheduled,
        Completed,
        Canceled
    }

    public enum MeetingParticipantRole
    {
        Complainant,
        Accused,
        Proctor,
        Witness,
        Other
    }

    public enum RelatedEntityType
    {
        Complaint,
        Meeting,
        CaseFile
    }
} 