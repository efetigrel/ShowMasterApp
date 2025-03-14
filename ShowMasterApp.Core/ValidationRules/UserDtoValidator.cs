using FluentValidation;
using ShowMasterApp.Core.Dtos;

public class UserDtoValidator : AbstractValidator<UserDto>
{
    public UserDtoValidator()
    {
        RuleFor(x => x.Email).NotEmpty().WithMessage("Email boş olamaz.");
        RuleFor(x => x.FullName).NotEmpty().WithMessage("Ad Soyad boş olamaz.");
        RuleFor(x => x.Role).NotEmpty().WithMessage("Rol boş olamaz.");
    }
}
