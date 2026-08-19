# Contracts


## DTOs
### TaskCreate
| Field | Type | Description |
| --- | --- | --- |
| title | str | task title |
| description | str | task description |

### TaskRead
| Field | Type | Description |
| --- | --- | --- |
| id | int | uuid primary key |
| title | str | task title |
| description | str | task description |
| status | int (Enum) | task status (complete, uncomplete) |
| created_at | datetime | task creation date |
| completed_at | datetime | task update date |

### TaskUpdate
| Field | Type | Description |
| --- | --- | --- |
| title (optional) | str | task title |
| description (optional) | str | task description |
| status | int (Enum) | task status (complete, uncomplete) |



## Endpoints
| Method | Endpoint | 
| --- | --- |
| POST | /api/tasks/ |
| GET | /api/tasks/ |
| GET | /api/tasks/{id} |
| PATCH | /api/tasks/{id} |
| DELETE | /api/tasks/{id} |


## Enums
### TaskStatus
| Value | Description |
| --- | --- |
| 0 | incomplete |
| 1 | complete |

## Errors
| Code | Message | Description |
| --- | --- | --- |
| 400 | Bad Request | Invalid request |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Internal server error |

## Search Params
| Param | Type | Description |
| --- | --- | --- | 
| status | int (Enum) | task status (complete, uncomplete) |
| title | str | task title |

