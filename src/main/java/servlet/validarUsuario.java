package servlet;

import dao.AlumnowebJpaController;
import dto.Alumnoweb;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

@WebServlet(name = "validarUsuario", urlPatterns = {"/validarUsuario"})
public class validarUsuario extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {

            String logi = request.getParameter("usuario");
            String pass = request.getParameter("contra");

            try {

                AlumnowebJpaController usuDAO = new AlumnowebJpaController();
                Alumnoweb u = new Alumnoweb();
                u.setNdniEstdWeb(logi);  // si usas dni para validar
                u.setPassEstd(pass);     // contraseña en texto plano para validar con BCrypt

                Alumnoweb usuEncontrado = usuDAO.validar(u);

                if (usuEncontrado == null) {
                    JSONObject jSONObject = new JSONObject();
                    jSONObject.put("resultado", "error");
                    jSONObject.put("mensaje", "Usuario o contraseña incorrectos");
                    out.print(jSONObject.toString());
                } else {

                    JSONObject jSONObject = new JSONObject();
                    jSONObject.put("resultado", "ok");
                    jSONObject.put("ndniEstdWeb", u.getNdniEstdWeb());
                    jSONObject.put("logiEstd", u.getLogiEstd());
                    jSONObject.put("codiEstWeb", u.getCodiEstWeb());
                    out.print(jSONObject.toString());
                }
            } catch (Exception ex) {
                out.print(ex.getMessage());
            }
        }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
